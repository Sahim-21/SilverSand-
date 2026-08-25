/**
 * Extra beds fill remaining places in the room. Occupancy 8 already uses the
 * full cap, so no extra bed can be added (BUSINESS_INFO.md / DATABASE.md).
 */
export function maxExtraBeds(occupancy: number, maxOccupancy: number): number {
  if (!Number.isFinite(occupancy) || !Number.isFinite(maxOccupancy)) return 0;
  return Math.max(0, Math.floor(maxOccupancy) - Math.floor(occupancy));
}

export function clampExtraBeds(
  occupancy: number,
  extraBeds: number,
  maxOccupancy: number,
): number {
  if (!Number.isFinite(extraBeds) || extraBeds < 0) return 0;
  return Math.min(Math.floor(extraBeds), maxExtraBeds(occupancy, maxOccupancy));
}
