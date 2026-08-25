import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

import { OCCUPANCY_TIERS, occupancyPrices, rooms } from "@/db/schema";
import { ROOM_SLUG } from "@/lib/business";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import type { OccupancyTier } from "@/lib/business";
import type { PublicPricing } from "@/lib/pricing/types";

async function fetchPricingUncached(): Promise<PublicPricing | null> {
  if (!isDatabaseConfigured()) return null;

  try {
    const db = getDb();
    const room = await db.query.rooms.findFirst({
      where: eq(rooms.slug, ROOM_SLUG),
      with: {
        occupancyPrices: {
          orderBy: asc(occupancyPrices.occupancy),
        },
      },
    });

    if (!room || !room.isPublished) return null;

    const occupancyRates = OCCUPANCY_TIERS.map((tier) => {
      const row = room.occupancyPrices.find((p) => p.occupancy === tier);
      return {
        occupancy: tier as OccupancyTier,
        nightlyRateInr: row?.nightlyRateInr ?? 0,
      };
    });

    const hasValidRates = occupancyRates.every((r) => r.nightlyRateInr > 0);
    if (!hasValidRates) return null;

    return {
      room: {
        slug: room.slug,
        name: room.name,
        maxOccupancy: room.maxOccupancy,
        currency: room.currency.trim(),
        extraBedRateInr: room.extraBedRateInr,
        isPublished: room.isPublished,
      },
      occupancyRates,
      updatedAt: room.updatedAt.toISOString(),
    };
  } catch {
    // Fail closed: unpublished UI + schema without Offers. Do not throw during
    // prerender when DATABASE_URL is set but unreachable (CI, local, Neon blip).
    return null;
  }
}

export async function getPublicPricing(): Promise<PublicPricing | null> {
  if (!isDatabaseConfigured()) return null;

  const cached = unstable_cache(fetchPricingUncached, ["public-pricing"], {
    tags: ["pricing"],
    revalidate: 60,
  });

  return cached();
}
