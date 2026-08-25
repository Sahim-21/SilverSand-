import type { Metadata } from "next";
import Link from "next/link";

import { ContactCta } from "@/components/marketing/contact-cta";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Text } from "@/components/ui/heading";
import {
  BUSINESS_NAME,
  FULL_ADDRESS,
  GOOGLE_MAPS_PLACE_URL,
} from "@/lib/business";
import { PAGE_SEO } from "@/lib/seo/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.contact);

export default function ContactPage() {
  return (
    <Container width="narrow">
      <Section>
        <Stack gap="lg">
          <PageHeader
            title="Contact"
            description={`${BUSINESS_NAME} — ${FULL_ADDRESS}`}
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/contact", label: "Contact" },
            ]}
          />
          <Text size="sm" tone="muted">
            Message us on WhatsApp with your travel dates and how many guests will share
            the Deluxe AC Room. We confirm availability ourselves — there is no instant
            OTA checkout on this site.
          </Text>
          <ContactCta layout="stack" />
          <Text size="sm" tone="muted">
            {FULL_ADDRESS}. Directions and the live map pin are on the{" "}
            <Link href="/location" className="text-mangrove underline">
              Location
            </Link>{" "}
            page, or{" "}
            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mangrove underline"
            >
              Google Maps
            </a>
            .
          </Text>
        </Stack>
      </Section>
    </Container>
  );
}
