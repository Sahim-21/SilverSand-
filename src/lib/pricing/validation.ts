import { z } from "zod";

import { OCCUPANCY_TIERS } from "@/lib/business";

export const occupancyTierSchema = z.union([
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(6),
  z.literal(8),
]);

export const adminPricingPatchSchema = z.object({
  extraBedRateInr: z.number().int().min(0),
  occupancyRates: z
    .array(
      z.object({
        occupancy: occupancyTierSchema,
        nightlyRateInr: z.number().int().positive(),
      }),
    )
    .length(OCCUPANCY_TIERS.length)
    .refine(
      (rates) => {
        const occupancies = rates.map((r) => r.occupancy).sort();
        const expected = [...OCCUPANCY_TIERS].sort();
        return occupancies.every((o, i) => o === expected[i]);
      },
      { message: "Must include exactly tiers 2, 3, 4, 6, 8" },
    ),
});

export type AdminPricingPatch = z.infer<typeof adminPricingPatchSchema>;
