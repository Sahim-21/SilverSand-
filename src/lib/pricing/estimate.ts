import type { OccupancyTier } from "@/lib/business";
import type { EstimateInput, EstimateResult, PublicPricing } from "@/lib/pricing/types";

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const start = Date.UTC(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const end = Date.UTC(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
  return Math.round((end - start) / msPerDay);
}

export function getOccupancyRate(
  pricing: PublicPricing,
  occupancy: OccupancyTier,
): number | null {
  const row = pricing.occupancyRates.find((r) => r.occupancy === occupancy);
  if (!row || row.nightlyRateInr <= 0) return null;
  return row.nightlyRateInr;
}

export function estimateStay(
  pricing: PublicPricing,
  input: EstimateInput,
): EstimateResult | null {
  const nights = nightsBetween(input.checkIn, input.checkOut);
  if (nights <= 0) return null;

  const base = getOccupancyRate(pricing, input.occupancy);
  if (base === null) return null;

  const extra = input.extraBeds * pricing.room.extraBedRateInr;
  const nightlySubtotalInr = base + extra;
  const totalInr = nights * nightlySubtotalInr;

  return { nights, nightlySubtotalInr, totalInr };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
