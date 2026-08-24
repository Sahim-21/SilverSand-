import { asc, eq } from "drizzle-orm";

import { occupancyPrices, rooms } from "@/db/schema";
import { ROOM_SLUG } from "@/lib/business";
import { getDb, isDatabaseConfigured } from "@/lib/db";

export type AdminPricing = {
  room: {
    id: string;
    name: string;
    extraBedRateInr: number;
    isPublished: boolean;
    /** ISO string — safe to pass as Server Component → Client Component prop. */
    updatedAt: string;
  };
  rates: Array<{ occupancy: number; nightlyRateInr: number }>;
};

/**
 * Load current pricing for the admin dashboard.
 *
 * Unlike getPublicPricing(), this does NOT require is_published = true or all
 * five occupancy tiers to be populated. It is called from a server-only page
 * (behind an auth check) and is never cached with the "pricing" tag — every
 * request to the admin dashboard reads from Postgres directly.
 *
 * Never import this from a public page or a client component.
 */
export async function getAdminPricing(): Promise<AdminPricing | null> {
  if (!isDatabaseConfigured()) return null;

  const db = getDb();
  const room = await db.query.rooms.findFirst({
    where: eq(rooms.slug, ROOM_SLUG),
    with: {
      occupancyPrices: {
        orderBy: asc(occupancyPrices.occupancy),
      },
    },
  });

  if (!room) return null;

  return {
    room: {
      id: room.id,
      name: room.name,
      extraBedRateInr: room.extraBedRateInr,
      isPublished: room.isPublished,
      updatedAt: room.updatedAt.toISOString(),
    },
    rates: room.occupancyPrices.map((p) => ({
      occupancy: p.occupancy,
      nightlyRateInr: p.nightlyRateInr,
    })),
  };
}
