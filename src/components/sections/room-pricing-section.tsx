import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { OccupancyPricing } from "@/components/marketing/occupancy-pricing";
import { Heading, Text } from "@/components/ui/heading";
import { BOOKING_HASH } from "@/lib/booking/anchor";
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
              The nightly rate depends on how many guests share the Deluxe AC Room.
              Rates are set by the owner and shown here when published — not estimated
              or rounded.{" "}
              <Link href={ROOM_PATH} className="text-mangrove underline">
                See the full room page
              </Link>{" "}
              for occupancy details and the booking widget.
            </Text>
          </div>
          <OccupancyPricing bookingHref={BOOKING_HASH} />
        </Stack>
      </Container>
    </Section>
  );
}
