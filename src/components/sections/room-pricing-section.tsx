import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { OccupancyPricing } from "@/components/marketing/occupancy-pricing";
import { Heading, Text } from "@/components/ui/heading";
import { ROOM_PATH } from "@/lib/business";

export function RoomPricingSection() {
  return (
    <Section className="bg-sand-deep/40">
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Room &amp; pricing
            </Heading>
            <Text tone="muted" className="mt-2">
              Occupancy rates are set by the owner in the admin panel and shown here
              when published.{" "}
              <Link href={ROOM_PATH} className="text-mangrove underline">
                View the Deluxe AC Room page
              </Link>{" "}
              for layout notes and the booking widget.
            </Text>
          </div>
          <OccupancyPricing />
        </Stack>
      </Container>
    </Section>
  );
}
