import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/heading";
import { BUSINESS_NAME } from "@/lib/business";
import { cn } from "@/lib/utils";

type AboutSectionProps = {
  compact?: boolean;
};

export function AboutSection({ compact = false }: AboutSectionProps) {
  return (
    <Section className={compact ? undefined : "bg-surface"}>
      <Container>
        <Stack gap="md" className="max-w-3xl">
          <Heading as="h2" size="section">
            About {BUSINESS_NAME}
          </Heading>
          <Text tone="muted">
            We are a homestay in Murudeshwar focused on direct bookings — WhatsApp and
            phone — so you deal with the host, not an OTA commission layer. The site
            shows one room type with occupancy-based pricing you can see before you
            message us (when rates are published).
          </Text>
          {!compact ? (
            <Text tone="muted">
              Host names, languages spoken, and the family story behind the house will
              be added when the owner provides them.
            </Text>
          ) : null}
          <TodoNotice
            item="hostName"
            detail="Host name(s) and languages not yet provided (checklist #20)."
          />
          {compact ? (
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              Read about us
            </Link>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
