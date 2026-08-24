import assert from "node:assert/strict";
import { test } from "node:test";

import { estimateEnquiry, estimateStay, nightsBetween } from "./estimate";
import type { PublicPricing } from "./types.ts";

const samplePricing: PublicPricing = {
  room: {
    slug: "deluxe-ac",
    name: "Deluxe AC Room",
    maxOccupancy: 8,
    currency: "INR",
    extraBedRateInr: 500,
    isPublished: true,
  },
  occupancyRates: [
    { occupancy: 2, nightlyRateInr: 2000 },
    { occupancy: 3, nightlyRateInr: 2500 },
    { occupancy: 4, nightlyRateInr: 3000 },
    { occupancy: 6, nightlyRateInr: 4000 },
    { occupancy: 8, nightlyRateInr: 5000 },
  ],
  updatedAt: "2026-08-24T00:00:00.000Z",
};

test("nightsBetween uses calendar dates", () => {
  const checkIn = new Date(2026, 8, 1);
  const checkOut = new Date(2026, 8, 4);
  assert.equal(nightsBetween(checkIn, checkOut), 3);
});

test("estimateStay matches DATABASE.md formula", () => {
  const result = estimateStay(samplePricing, {
    checkIn: new Date(2026, 8, 1),
    checkOut: new Date(2026, 8, 3),
    occupancy: 4,
    extraBeds: 1,
  });
  assert.ok(result);
  // 2 nights * (3000 + 1 * 500) = 7000
  assert.equal(result.totalInr, 7000);
});

test("quantity multiplies occupancy rate only", () => {
  const result = estimateStay(samplePricing, {
    checkIn: new Date(2026, 8, 1),
    checkOut: new Date(2026, 8, 2),
    occupancy: 2,
    extraBeds: 1,
    quantity: 2,
  });
  assert.ok(result);
  // 1 night * (2 * 2000 + 500) = 4500
  assert.equal(result.totalInr, 4500);
});

test("estimateStay fails closed without a published occupancy rate", () => {
  const unpublished: PublicPricing = {
    ...samplePricing,
    occupancyRates: samplePricing.occupancyRates.map((row) =>
      row.occupancy === 2 ? { ...row, nightlyRateInr: 0 } : row,
    ),
  };
  const result = estimateStay(unpublished, {
    checkIn: new Date(2026, 8, 1),
    checkOut: new Date(2026, 8, 2),
    occupancy: 2,
    extraBeds: 0,
  });
  assert.equal(result, null);
});

test("estimateEnquiry sums multiple lines", () => {
  const result = estimateEnquiry(
    [samplePricing],
    new Date(2026, 8, 1),
    new Date(2026, 8, 3),
    [
      { roomSlug: "deluxe-ac", occupancy: 2, quantity: 1, extraBeds: 0 },
      { roomSlug: "deluxe-ac", occupancy: 4, quantity: 1, extraBeds: 0 },
    ],
  );
  assert.ok(result);
  // 2 nights * (2000 + 3000) = 10000
  assert.equal(result.totalInr, 10000);
  assert.equal(result.nights, 2);
});
