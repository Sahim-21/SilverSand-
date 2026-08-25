import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Text } from "@/components/ui/heading";
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
            Bookings are confirmed by the host on WhatsApp or phone. Prices on this
            website are estimates until the owner confirms your dates and occupancy.
            House rules, check-in times, and cancellation terms will be published here
            once the owner provides them.
          </Text>
        </Stack>
      </Section>
    </Container>
  );
}
