import { ROOM_PATH } from "@/lib/business";

/** In-page target for the booking widget (Home hero and Deluxe AC Room hero). */
export const BOOKING_SECTION_ID = "booking";
export const BOOKING_HASH = `#${BOOKING_SECTION_ID}`;

/** Use when the widget is not on the current page. */
export const ROOM_BOOKING_HREF = `${ROOM_PATH}${BOOKING_HASH}`;
