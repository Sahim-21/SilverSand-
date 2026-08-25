import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Text } from "@/components/ui/heading";
import { PAGE_SEO } from "@/lib/seo/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.privacy);

export default function PrivacyPage() {
  return (
    <Container width="narrow">
      <Section>
        <Stack gap="md">
          <PageHeader
            title="Privacy Policy"
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/privacy", label: "Privacy Policy" },
            ]}
          />
          <Text tone="muted">
            When you contact Silver Sand Beach Homestay by phone or WhatsApp, we use
            your number and message only to respond about your stay. We do not sell your
            data. This site does not use a payment gateway in v1.
          </Text>
          <Text size="sm" tone="muted">
            Full policy text will be expanded before public launch if required by the
            owner&apos;s counsel.
          </Text>
        </Stack>
      </Section>
    </Container>
  );
}
