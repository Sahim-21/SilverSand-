import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
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
            A house in Murudeshwar, not a hotel
          </Heading>
          <Text tone="muted">
            {BUSINESS_NAME} is a family-run homestay. There is one Deluxe AC Room,
            priced by how many guests share it. When you message us, you are talking to
            the person who owns the house, not a booking desk. We confirm availability
            ourselves and reply on WhatsApp with the rate for your dates.
          </Text>
          {!compact ? (
            <>
              <Text tone="muted">
                We are not a hotel. There is no reception, no room-service menu, and no
                booking site between you and the host. If that suits your trip — a real
                house, a direct conversation, and a price based on your group size —
                this is the right fit.
              </Text>
            </>
          ) : null}
          {compact ? (
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              About this homestay
            </Link>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
