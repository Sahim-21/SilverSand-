import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { OccupancyPricing } from "@/components/marketing/occupancy-pricing";
import { Heading, Text } from "@/components/ui/heading";
import { BOOKING_HASH } from "@/lib/booking/anchor";

export function RoomLayoutSection() {
  return (
    <Section className="bg-sand-deep/40">
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Occupancy pricing
            </Heading>
            <Text tone="muted" className="mt-2">
              The rate is per room, per night, and depends on how many guests share it.
              A larger group pays more for the room, but less per person. GST is
              included.
            </Text>
          </div>
          <OccupancyPricing bookingHref={BOOKING_HASH} />
        </Stack>
      </Container>
    </Section>
  );
}
