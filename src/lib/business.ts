/**
 * Confirmed business constants — see docs/BUSINESS_INFO.md.
 * Not owner-editable from admin in v1.
 */
export const BUSINESS_NAME = "Silver Sand Beach Homestay";
export const BUSINESS_PLACE = "Murudeshwar, Karnataka, India";
export const SITE_HOST = "silversandhomestay.com";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_HOST}`;

export const DISPLAY_PHONE = "+91 99862 22892";
export const PHONE_E164 = "+919986222892";
export const WHATSAPP_E164 = "919986222892";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`;
export const TEL_URL = `tel:${PHONE_E164}`;

export const ROOM_SLUG = "deluxe-ac";
export const ROOM_NAME = "Deluxe AC Room";

export const OCCUPANCY_TIERS = [2, 3, 4, 6, 8] as const;
export type OccupancyTier = (typeof OCCUPANCY_TIERS)[number];
