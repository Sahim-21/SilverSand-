import type { Metadata } from "next";
import Link from "next/link";

import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Split } from "@/components/layout/split";
import { Stack } from "@/components/layout/stack";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { Text } from "@/components/ui/heading";
import { BUSINESS_NAME, BUSINESS_PLACE, ROOM_NAME } from "@/lib/business";

export const metadata: Metadata = {
  title: "Homestay in Murudeshwar",
  description:
    "Silver Sand Beach Homestay in Murudeshwar, Karnataka. One Deluxe AC Room, occupancy-based pricing, book direct on WhatsApp.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <Container>
      <Section>
        <Split aside={<BookingWidgetPlaceholder />}>
          <Stack gap="lg">
            <PageHeader
              eyebrow={BUSINESS_PLACE}
              title="Homestay in Murudeshwar"
              description={
                <>
                  {BUSINESS_NAME} offers one room type — the{" "}
                  <Link href="/rooms/deluxe-ac" className="text-mangrove underline">
                    {ROOM_NAME}
                  </Link>{" "}
                  — with occupancy-based pricing for families and groups. Message us on
                  WhatsApp with your dates; we confirm availability ourselves.
                </>
              }
            />
            <PhotoFrame />
            <Text size="sm" tone="muted">
              We do not publish distances, amenities, or nightly rates until the owner
              confirms them. Rates shown on the site always come from the admin panel,
              never hardcoded in the page.
            </Text>
          </Stack>
        </Split>
      </Section>
    </Container>
  );
}
