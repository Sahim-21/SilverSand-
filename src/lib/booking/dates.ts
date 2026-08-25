/** Local-calendar helpers for the booking widget. Do not use UTC date-only parsing. */

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function todayIso(): string {
  return toIsoDate(new Date());
}

export function addDaysIso(iso: string, days: number): string | null {
  const date = parseIsoDate(iso);
  if (!date) return null;
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

/** Earliest valid check-out: the calendar day after check-in. */
export function earliestCheckOutIso(checkInIso: string): string | null {
  return addDaysIso(checkInIso, 1);
}

/**
 * Check-out must be after check-in. Equal or earlier dates snap to the
 * next morning so the date input cannot keep an invalid stay.
 */
export function normalizeCheckOutIso(checkInIso: string, checkOutIso: string): string {
  const minOut = earliestCheckOutIso(checkInIso);
  if (!minOut) return checkOutIso;
  if (!checkOutIso || checkOutIso <= checkInIso) return minOut;
  return checkOutIso;
}

export function clampIsoDateToMin(iso: string, minIso: string): string {
  if (!iso || !minIso) return iso;
  return iso < minIso ? minIso : iso;
}

export function formatIsoDateLong(iso: string): string {
  const date = parseIsoDate(iso);
  if (!date) return iso;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
