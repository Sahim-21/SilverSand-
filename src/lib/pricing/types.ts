import type { OccupancyTier } from "@/lib/business";

export type OccupancyRate = {
  occupancy: OccupancyTier;
  nightlyRateInr: number;
};

export type PublicPricing = {
  room: {
    slug: string;
    name: string;
    maxOccupancy: number;
    currency: string;
    extraBedRateInr: number;
    isPublished: boolean;
  };
  occupancyRates: OccupancyRate[];
  updatedAt: string;
};

export type EstimateInput = {
  checkIn: Date;
  checkOut: Date;
  occupancy: OccupancyTier;
  extraBeds: number;
  quantity?: number;
};

export type EstimateResult = {
  nights: number;
  nightlySubtotalInr: number;
  totalInr: number;
};

/** One enquiry line — occupancy option of a room type, with quantity. */
export type EnquiryLine = {
  roomSlug: string;
  occupancy: OccupancyTier;
  quantity: number;
  extraBeds: number;
};

export type EnquiryLineEstimate = EnquiryLine & {
  nightlySubtotalInr: number;
  totalInr: number;
};

export type EnquiryEstimate = {
  nights: number;
  totalInr: number;
  lines: EnquiryLineEstimate[];
};
