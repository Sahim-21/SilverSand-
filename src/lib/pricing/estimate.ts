import type { OccupancyTier } from "@/lib/business";
import { clampExtraBeds } from "@/lib/pricing/guest-cap";
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

export type NightlyLinePrice = EnquiryLine & {
  occupancyRateInr: number;
  extraBedTotalInr: number;
  nightlySubtotalInr: number;
};

export type NightlyEnquiryPrice = {
  nightlyTotalInr: number;
  lines: NightlyLinePrice[];
};

/**
 * Occupancy + extra-bed nightly total from published rates only.
 * Extra beds are clamped so occupancy + extra beds never exceeds maxOccupancy.
 */
export function priceEnquiryNightly(
  catalog: PublicPricing[],
  lines: EnquiryLine[],
): NightlyEnquiryPrice | null {
  if (lines.length === 0) return null;

  const pricedLines: NightlyLinePrice[] = [];

  for (const line of lines) {
    if (line.quantity < 1 || line.extraBeds < 0) return null;
    const pricing = catalog.find((item) => item.room.slug === line.roomSlug);
    if (!pricing) return null;

    const occupancyRateInr = getOccupancyRate(pricing, line.occupancy);
    if (occupancyRateInr === null) return null;

    const extraBeds = clampExtraBeds(
      line.occupancy,
      line.extraBeds,
      pricing.room.maxOccupancy,
    );
    const extraBedRate = Math.max(0, pricing.room.extraBedRateInr);
    const extraBedTotalInr = extraBeds * extraBedRate;
    const nightlySubtotalInr = line.quantity * occupancyRateInr + extraBedTotalInr;

    pricedLines.push({
      ...line,
      extraBeds,
      occupancyRateInr,
      extraBedTotalInr,
      nightlySubtotalInr,
    });
  }

  return {
    nightlyTotalInr: pricedLines.reduce(
      (sum, line) => sum + line.nightlySubtotalInr,
      0,
    ),
    lines: pricedLines,
  };
}

export function estimateStay(
  pricing: PublicPricing,
  input: EstimateInput,
): EstimateResult | null {
  const nights = nightsBetween(input.checkIn, input.checkOut);
  if (nights <= 0) return null;

  const priced = priceEnquiryNightly(
    [pricing],
    [
      {
        roomSlug: pricing.room.slug,
        occupancy: input.occupancy,
        extraBeds: input.extraBeds,
        quantity: input.quantity ?? 1,
      },
    ],
  );
  if (!priced) return null;

  const nightlySubtotalInr = priced.nightlyTotalInr;
  return { nights, nightlySubtotalInr, totalInr: nights * nightlySubtotalInr };
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

  const nightly = priceEnquiryNightly(catalog, lines);
  if (!nightly) return null;

  const pricedLines: EnquiryLineEstimate[] = nightly.lines.map((line) => ({
    roomSlug: line.roomSlug,
    occupancy: line.occupancy,
    quantity: line.quantity,
    extraBeds: line.extraBeds,
    nightlySubtotalInr: line.nightlySubtotalInr,
    totalInr: nights * line.nightlySubtotalInr,
  }));

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
