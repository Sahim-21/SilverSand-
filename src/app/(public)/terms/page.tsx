import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Text } from "@/components/ui/heading";
import { ROOM_NAME } from "@/lib/business";
import { PAGE_SEO } from "@/lib/seo/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.terms);

export default function TermsPage() {
  return (
    <Container width="narrow">
      <Section>
        <Stack gap="md">
          <PageHeader
            title="Booking terms"
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/terms", label: "Terms" },
            ]}
          />
          <Text tone="muted">
            Bookings are confirmed by the host on WhatsApp or phone — not through an
            OTA checkout. Prices on this website are estimates until the owner
            confirms your dates and occupancy; we confirm the total on WhatsApp before
            you travel.
          </Text>
          <Text tone="muted">
            We offer one room type: the {ROOM_NAME}. All rooms are air-conditioned.
            Meals are not included and are not offered at the homestay.
          </Text>
          <Text tone="muted">
            Check-in is at 11:00 AM. Check-out is at 11:00 AM the following day.
          </Text>
          <Text tone="muted">
            Bookings are non-cancellable and non-refundable. Once your stay is
            confirmed, cancellations and refunds are not available.
          </Text>
          <Text size="sm" tone="muted">
            House rules (ID requirements, guest policies) and whether published
            rates include GST or other taxes will be added here when the owner
            confirms them.
          </Text>
        </Stack>
      </Section>
    </Container>
  );
}
