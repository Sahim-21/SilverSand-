import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { OccupancyPricing } from "@/components/marketing/occupancy-pricing";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { Heading, Text } from "@/components/ui/heading";

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
              2-sharing rate is not the same as the 8-sharing rate halved. Rates are set
              by the owner and updated in the admin panel; the numbers you see are
              current, not rounded estimates.
            </Text>
          </div>
          <OccupancyPricing />
          <TodoNotice
            item="bedsBath"
            detail="Bed count, bathroom layout, and maximum extra beds for this room are not published yet (checklist #3). The owner needs to confirm before we list them here."
          />
        </Stack>
      </Container>
    </Section>
  );
}
