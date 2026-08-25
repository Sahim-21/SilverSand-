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
    description: `${BUSINESS_NAME} is a homestay in Murudeshwar, Karnataka. One ${ROOM_NAME} with occupancy-based pricing for 2, 3, 4, 6, or 8 sharing. Book direct on WhatsApp or call ${DISPLAY_PHONE}.`,
    path: "/",
  },
  rooms: {
    title: "Rooms in Murudeshwar",
    description: `Rooms at ${BUSINESS_NAME}: one ${ROOM_NAME}, priced by how many guests share it (2–8). Occupancy rates come from the owner — not an OTA catalogue.`,
    path: "/rooms",
  },
  room: {
    title: `${ROOM_NAME} in Murudeshwar`,
    description: `${ROOM_NAME} at ${BUSINESS_NAME}, Murudeshwar. Nightly rate by occupancy (2, 3, 4, 6, or 8 sharing) plus extra bed when offered. Check dates on WhatsApp.`,
    path: ROOM_PATH,
  },
  gallery: {
    title: "Photos of the homestay",
    description: `Photographs of ${BUSINESS_NAME} in Murudeshwar. Owner-supplied photos will replace these placeholders — we do not use stock villa images.`,
    path: "/gallery",
  },
  about: {
    title: "About this homestay",
    description: `About ${BUSINESS_NAME} in Murudeshwar: a single-property stay with one ${ROOM_NAME}, occupancy pricing, and direct WhatsApp booking with the host.`,
    path: "/about",
  },
  location: {
    title: "Location in Murudeshwar",
    description: `${BUSINESS_NAME} is in Murudeshwar, Karnataka. Street address and map pin will be published when the owner confirms them. Ask for directions on WhatsApp.`,
    path: "/location",
  },
  contact: {
    title: "Phone and WhatsApp",
    description: `Contact ${BUSINESS_NAME} in Murudeshwar: WhatsApp or call ${DISPLAY_PHONE}. Send dates and occupancy — we confirm availability ourselves.`,
    path: "/contact",
  },
  privacy: {
    title: "Privacy Policy",
    description: `How ${BUSINESS_NAME} uses your phone number and WhatsApp messages when you enquire about a stay in Murudeshwar. We do not sell your data.`,
    path: "/privacy",
  },
  terms: {
    title: "Booking terms",
    description: `Booking terms for ${BUSINESS_NAME}: WhatsApp or phone confirmation, occupancy estimates from published rates, and house rules once the owner publishes them.`,
    path: "/terms",
  },
  notFound: {
    title: "Page not found",
    description: `That page is not on ${BUSINESS_NAME}. Go back to the homestay in Murudeshwar, or WhatsApp us about dates.`,
    path: "/404",
  },
} as const satisfies Record<string, PageSeoCopy>;
