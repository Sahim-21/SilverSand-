import type { Metadata } from "next";

import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { ROOM_NAME } from "@/lib/business";

export const metadata: Metadata = {
  title: ROOM_NAME,
  description:
    "Deluxe AC Room at Silver Sand Beach Homestay, Murudeshwar. Occupancy pricing for 2, 3, 4, 6, or 8 sharing plus extra bed.",
  alternates: { canonical: "/rooms/deluxe-ac" },
};

export default function DeluxeAcRoomPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        <section>
          <h1 className="font-serif text-3xl font-semibold text-[var(--ink)]">
            {ROOM_NAME}
          </h1>
          <p className="mt-4 max-w-prose text-[var(--muted)]">
            Our only room type. Nightly rate depends on how many guests share the room
            (2, 3, 4, 6, or 8). Extra beds are charged per person when offered — the
            current rate is set by the owner in the admin panel.
          </p>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Bed layout, bathroom details, and photos will be added when the owner
            provides them. We are not listing amenities we have not confirmed.
          </p>
        </section>
        <BookingWidgetPlaceholder />
      </div>
    </div>
  );
}
