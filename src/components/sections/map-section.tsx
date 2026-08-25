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
            Getting here
          </Heading>
          <Text tone="muted">
            {BUSINESS_PLACE}. The nearest railway station is{" "}
            <strong>Murdeshwar Railway Station</strong> (MRDW) on the Konkan Railway —
            trains from Mangalore, Goa, and Mumbai stop here. The nearest large city is
            Hubli (~160 km east). Auto-rickshaws and taxis operate from the station.
          </Text>
          <Text size="sm" tone="muted">
            We have not published a street address or a precise map pin — the owner
            needs to confirm the location before we embed a map or give driving
            directions. Ask us on WhatsApp and we will share the pin directly.
          </Text>
          <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-line bg-sand-deep">
            <Text size="sm" tone="muted" className="px-4 text-center">
              Map embed pending — owner needs to confirm the street address and
              coordinates (checklist #1, #11).
            </Text>
          </div>
          <TodoNotice
            item="coordinates"
            detail="A confirmed map pin is required before we embed a map. Do not use OTA-mirror coordinates — confirm directly with the owner (checklist #11)."
          />
          {showLocationLink ? (
            <Link
              href="/location"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              Location &amp; directions
            </Link>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
