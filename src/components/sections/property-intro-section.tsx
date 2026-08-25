import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/heading";
import { BUSINESS_NAME, ROOM_PATH } from "@/lib/business";

export function PropertyIntroSection() {
  return (
    <Section>
      <Container>
        <Stack gap="md" className="max-w-3xl">
          <Heading as="h2" size="section">
            One room. You set the occupancy.
          </Heading>
          <Text tone="muted">
            {BUSINESS_NAME} has one room type:{" "}
            <Link href={ROOM_PATH} className="text-mangrove underline">
              the Deluxe AC Room
            </Link>
            . The nightly rate changes depending on how many guests share it — 2, 3, 4,
            6, or 8 — so a family of six pays one bill, not three OTA bookings cobbled
            together. We don&apos;t run multiple properties or rent out a room while we
            live elsewhere; this is a single homestay, and the host is the one answering
            your WhatsApp.
          </Text>
          <Text size="sm" tone="muted">
            The room is air-conditioned and a bathroom is available. Nightly rates are
            by occupancy and include GST.
          </Text>
        </Stack>
      </Container>
    </Section>
  );
}
