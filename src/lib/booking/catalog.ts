import {
  MAX_TOTAL_GUESTS,
  OCCUPANCY_TIERS,
  ROOM_NAME,
  ROOM_SLUG,
} from "@/lib/business";
import type { OccupancyTier } from "@/lib/business";
import type { OccupancyRate, PublicPricing } from "@/lib/pricing/types";

/**
 * A sellable room type the widget can list.
 * Today GET /api/pricing returns one room; wrap it as an array so a second
 * type can be appended later without rewriting the form.
 */
export type BookableRoom = {
  slug: string;
  name: string;
  occupancyOptions: OccupancyTier[];
  extraBedRateInr: number | null;
  occupancyRates: OccupancyRate[];
  maxOccupancy: number;
};

export function catalogFromPricing(pricing: PublicPricing | null): BookableRoom[] {
  if (!pricing) {
    return [
      {
        slug: ROOM_SLUG,
        name: ROOM_NAME,
        occupancyOptions: [...OCCUPANCY_TIERS],
        extraBedRateInr: null,
        occupancyRates: [],
        maxOccupancy: MAX_TOTAL_GUESTS,
      },
    ];
  }

  return [
    {
      slug: pricing.room.slug,
      name: pricing.room.name,
      occupancyOptions: pricing.occupancyRates.map((row) => row.occupancy),
      extraBedRateInr: pricing.room.extraBedRateInr,
      occupancyRates: pricing.occupancyRates,
      maxOccupancy: pricing.room.maxOccupancy,
    },
  ];
}

export function pricingListFromCatalog(pricing: PublicPricing | null): PublicPricing[] {
  return pricing ? [pricing] : [];
}

export function occupancyOptionValue(
  roomSlug: string,
  occupancy: OccupancyTier,
): string {
  return `${roomSlug}:${occupancy}`;
}

export function parseOccupancyOptionValue(
  value: string,
): { roomSlug: string; occupancy: OccupancyTier } | null {
  const separator = value.lastIndexOf(":");
  if (separator <= 0) return null;
  const roomSlug = value.slice(0, separator);
  const occupancy = Number(value.slice(separator + 1));
  if (![2, 3, 4, 6, 8].includes(occupancy)) return null;
  return { roomSlug, occupancy: occupancy as OccupancyTier };
}
