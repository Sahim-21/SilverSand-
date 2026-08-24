import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/heading";
import { BUSINESS_PLACE } from "@/lib/business";
import { cn } from "@/lib/utils";

type MapSectionProps = {
  showLocationLink?: boolean;
};

export function MapSection({ showLocationLink = true }: MapSectionProps) {
  return (
    <Section className="bg-surface">
      <Container>
        <Stack gap="md" className="max-w-3xl">
          <Heading as="h2" size="section">
            Map &amp; directions
          </Heading>
          <Text tone="muted">
            {BUSINESS_PLACE}. A street address, Google Maps embed, and driving
            directions will be added when the owner provides a confirmed pin.
          </Text>
          <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-line bg-sand-deep">
            <Text size="sm" tone="muted" className="px-4 text-center">
              Map embed placeholder — requires owner coordinates (checklist #11)
              and full address (checklist #1).
            </Text>
          </div>
          <TodoNotice item="coordinates" />
          {showLocationLink ? (
            <Link href="/location" className={cn(buttonVariants({ variant: "outline" }), "w-fit")}>
              Location page
            </Link>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
