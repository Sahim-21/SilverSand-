/**
 * Unique title tags and meta descriptions — one intent per URL.
 * Titles (except home) are completed by the root layout template:
 * `%s | Silver Sand Beach Homestay`.
 */

import { BUSINESS_NAME, DISPLAY_PHONE, ROOM_NAME, ROOM_PATH } from "@/lib/business";

export type PageSeoCopy = {
  title: string;
  description: string;
  path: string;
  /** Home uses an absolute title so the brand is not duplicated by the template. */
  absoluteTitle?: string;
};

export const PAGE_SEO = {
  home: {
    title: "Homestay in Murudeshwar",
    absoluteTitle: `${BUSINESS_NAME} | Homestay in Murudeshwar`,
    description: `${BUSINESS_NAME} — one Deluxe AC Room in Murudeshwar, Karnataka. Priced by occupancy (2–8 guests). Book direct on WhatsApp at ${DISPLAY_PHONE}. No OTA, no middleman.`,
    path: "/",
  },
  rooms: {
    title: "Rooms in Murudeshwar",
    description: `One room at ${BUSINESS_NAME}: the ${ROOM_NAME}, air-conditioned, priced by how many guests share it (2, 3, 4, 6, or 8). Rates are set by the owner — not an OTA estimate.`,
    path: "/rooms",
  },
  room: {
    title: `${ROOM_NAME} — occupancy pricing`,
    description: `The ${ROOM_NAME} at ${BUSINESS_NAME}, Murudeshwar. Nightly rate set by the owner based on occupancy (2–8 sharing). Extra bed available when offered. Check dates on WhatsApp.`,
    path: ROOM_PATH,
  },
  gallery: {
    title: "Photos — Silver Sand Beach Homestay",
    description: `Photographs of ${BUSINESS_NAME} in Murudeshwar. Owner-supplied images of the room, bathroom, and exterior. Placeholders until the owner provides them.`,
    path: "/gallery",
  },
  about: {
    title: "About Silver Sand Beach Homestay",
    description: `${BUSINESS_NAME} is a family-run homestay in Murudeshwar with one Deluxe AC Room. Book directly with the host on WhatsApp — no OTA, no booking fee.`,
    path: "/about",
  },
  location: {
    title: "Getting to Murudeshwar",
    description: `${BUSINESS_NAME} at 1, Naveen Beach Rd, Murdeshwar, Mavalli, Karnataka 581350. Murdeshwar Railway Station is on the Konkan Railway. Live map pin on this page.`,
    path: "/location",
  },
  contact: {
    title: "Phone and WhatsApp",
    description: `Contact ${BUSINESS_NAME}: WhatsApp or call ${DISPLAY_PHONE}. Send your dates and group size — the host confirms availability directly.`,
    path: "/contact",
  },
  privacy: {
    title: "Privacy Policy",
    description: `How ${BUSINESS_NAME} uses your phone number and WhatsApp messages when you enquire about a stay in Murudeshwar. We do not sell your data.`,
    path: "/privacy",
  },
  terms: {
    title: "Booking terms",
    description: `Booking terms for ${BUSINESS_NAME}: WhatsApp or phone confirmation, ${ROOM_NAME} (air-conditioned), check-in 11:00 AM, non-cancellable bookings, no meals included. GST and house rules pending owner confirmation.`,
    path: "/terms",
  },
  notFound: {
    title: "Page not found",
    description: `That page is not on ${BUSINESS_NAME}. Return to the homestay in Murudeshwar, or WhatsApp us about your dates.`,
    path: "/404",
  },
} as const satisfies Record<string, PageSeoCopy>;
