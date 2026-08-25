import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { OccupancyPricing } from "@/components/marketing/occupancy-pricing";
import { TodoNotice } from "@/components/marketing/todo-notice";
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
              The rate below is per room per night, based on how many guests share it.
              Higher occupancy means a lower cost per person — which is why the
              2-sharing rate is not the same as the 8-sharing rate halved.
            </Text>
          </div>
          <OccupancyPricing bookingHref={BOOKING_HASH} />
          <TodoNotice
            item="bedsBath"
            detail="Bed count and bathroom layout for this room are not published yet (checklist #3)."
          />
        </Stack>
      </Container>
    </Section>
  );
}
