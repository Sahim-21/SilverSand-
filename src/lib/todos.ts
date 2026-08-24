/**
 * Owner missing-info markers — see docs/BUSINESS_INFO.md checklist.
 * Use in UI where copy would otherwise be invented.
 */
export const OWNER_CHECKLIST = {
  address: 1,
  photos: 2,
  bedsBath: 3,
  checkInOut: 4,
  cancellation: 5,
  parking: 6,
  wifi: 7,
  landmarkDistances: 8,
  reviews: 9,
  gbp: 10,
  coordinates: 11,
  occupancyRates: 12,
  extraBedPolicy: 13,
  guestCountRules: 14,
  unitCount: 15,
  meals: 16,
  gst: 17,
  domain: 18,
  registration: 19,
  hostName: 20,
  languages: 20,
  houseRules: 21,
  otaPolicy: 22,
} as const;

export function todoMessage(item: keyof typeof OWNER_CHECKLIST): string {
  const n = OWNER_CHECKLIST[item];
  return `TODO: Owner input required (checklist #${n} in docs/BUSINESS_INFO.md).`;
}
