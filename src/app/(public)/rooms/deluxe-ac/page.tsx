import type { Metadata } from "next";

import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Split } from "@/components/layout/split";
import { Stack } from "@/components/layout/stack";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { Text } from "@/components/ui/heading";
import { ROOM_NAME } from "@/lib/business";

export const metadata: Metadata = {
  title: ROOM_NAME,
  description:
    "Deluxe AC Room at Silver Sand Beach Homestay, Murudeshwar. Occupancy pricing for 2, 3, 4, 6, or 8 sharing plus extra bed.",
  alternates: { canonical: "/rooms/deluxe-ac" },
};

export default function DeluxeAcRoomPage() {
  return (
    <Container>
      <Section>
        <Split aside={<BookingWidgetPlaceholder />}>
          <Stack gap="lg">
            <PageHeader
              title={ROOM_NAME}
              description="Our only room type. Nightly rate depends on how many guests share the room (2, 3, 4, 6, or 8). Extra beds are charged per person when offered — the current rate is set by the owner in the admin panel."
            />
            <PhotoFrame
              ratio="room"
              caption="Room photographs will be added when the owner provides them."
            />
            <Text size="sm" tone="muted">
              Bed layout, bathroom details, and amenities will be listed only when
              confirmed. We are not filling those from OTA scrapes.
            </Text>
          </Stack>
        </Split>
      </Section>
    </Container>
  );
}
