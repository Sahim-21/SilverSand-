import type { Metadata } from "next";
import Link from "next/link";

import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { BUSINESS_NAME, BUSINESS_PLACE, ROOM_NAME } from "@/lib/business";

export const metadata: Metadata = {
  title: "Homestay in Murudeshwar",
  description:
    "Silver Sand Beach Homestay in Murudeshwar, Karnataka. One Deluxe AC Room, occupancy-based pricing, book direct on WhatsApp.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        <section>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--sea)]">
            {BUSINESS_PLACE}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[var(--ink)] md:text-4xl">
            Homestay in Murudeshwar
          </h1>
          <p className="mt-4 max-w-prose text-[var(--muted)]">
            {BUSINESS_NAME} offers one room type — the{" "}
            <Link href="/rooms/deluxe-ac" className="text-[var(--sea)] underline">
              {ROOM_NAME}
            </Link>
            — with occupancy-based pricing for families and groups. Message us on
            WhatsApp with your dates; we confirm availability ourselves.
          </p>
          <p className="mt-4 max-w-prose text-sm text-[var(--muted)]">
            We do not publish distances, amenities, or nightly rates until the owner
            confirms them. Rates shown on the site always come from the admin panel,
            never hardcoded in the page.
          </p>
        </section>
        <BookingWidgetPlaceholder />
      </div>
    </div>
  );
}
