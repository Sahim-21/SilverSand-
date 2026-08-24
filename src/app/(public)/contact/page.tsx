import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { buttonVariants } from "@/components/ui/button";
import { Text } from "@/components/ui/heading";
import {
  BUSINESS_NAME,
  BUSINESS_PLACE,
  DISPLAY_PHONE,
  TEL_URL,
  WHATSAPP_URL,
} from "@/lib/business";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${BUSINESS_NAME} in Murudeshwar by phone or WhatsApp.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container width="narrow">
      <Section>
        <Stack gap="lg">
          <PageHeader
            title="Contact"
            description={`${BUSINESS_NAME} — ${BUSINESS_PLACE}`}
          />
          <Text size="sm" tone="muted">
            Street address and map pin are not published yet. Use phone or WhatsApp for
            directions and availability.
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "whatsapp" }))}
            >
              WhatsApp {DISPLAY_PHONE}
            </a>
            <a href={TEL_URL} className={cn(buttonVariants({ variant: "call" }))}>
              Call {DISPLAY_PHONE}
            </a>
          </div>
        </Stack>
      </Section>
    </Container>
  );
}
