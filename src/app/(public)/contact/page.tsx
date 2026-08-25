import type { Metadata } from "next";
import Link from "next/link";

import { ContactCta } from "@/components/marketing/contact-cta";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Text } from "@/components/ui/heading";
import { BUSINESS_NAME, BUSINESS_PLACE } from "@/lib/business";
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
            description={`${BUSINESS_NAME} — ${BUSINESS_PLACE}`}
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
          <TodoNotice
            item="address"
            detail="Full postal address and map pin are not published yet (checklist #1, #11)."
          />
          <Text size="sm" tone="muted">
            Once we have a confirmed address, directions will appear on the{" "}
            <Link href="/location" className="text-mangrove underline">
              Location
            </Link>{" "}
            page.
          </Text>
        </Stack>
      </Section>
    </Container>
  );
}
