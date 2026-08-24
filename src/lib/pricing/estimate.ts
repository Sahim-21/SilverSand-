import type { OccupancyTier } from "@/lib/business";
import type {
  EnquiryEstimate,
  EnquiryLine,
  EnquiryLineEstimate,
  EstimateInput,
  EstimateResult,
  PublicPricing,
} from "@/lib/pricing/types";

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

  const quantity = input.quantity ?? 1;
  if (quantity < 1 || input.extraBeds < 0) return null;

  const base = getOccupancyRate(pricing, input.occupancy);
  if (base === null) return null;

  const extra = input.extraBeds * pricing.room.extraBedRateInr;
  const nightlySubtotalInr = quantity * base + extra;
  const totalInr = nights * nightlySubtotalInr;

  return { nights, nightlySubtotalInr, totalInr };
}

/**
 * Multi-line enquiry total. Rates come only from the catalog (GET /api/pricing).
 * Quantity multiplies the occupancy nightly rate; extra beds are per line, not
 * multiplied by quantity. Fail closed if any line has no published rate.
 */
export function estimateEnquiry(
  catalog: PublicPricing[],
  checkIn: Date,
  checkOut: Date,
  lines: EnquiryLine[],
): EnquiryEstimate | null {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0 || lines.length === 0) return null;

  const pricedLines: EnquiryLineEstimate[] = [];

  for (const line of lines) {
    if (line.quantity < 1 || line.extraBeds < 0) return null;
    const pricing = catalog.find((item) => item.room.slug === line.roomSlug);
    if (!pricing) return null;

    const result = estimateStay(pricing, {
      checkIn,
      checkOut,
      occupancy: line.occupancy,
      extraBeds: line.extraBeds,
      quantity: line.quantity,
    });
    if (!result) return null;

    pricedLines.push({
      ...line,
      nightlySubtotalInr: result.nightlySubtotalInr,
      totalInr: result.totalInr,
    });
  }

  return {
    nights,
    totalInr: pricedLines.reduce((sum, line) => sum + line.totalInr, 0),
    lines: pricedLines,
  };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
