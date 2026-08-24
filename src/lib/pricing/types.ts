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
};

export type EstimateResult = {
  nights: number;
  nightlySubtotalInr: number;
  totalInr: number;
};
