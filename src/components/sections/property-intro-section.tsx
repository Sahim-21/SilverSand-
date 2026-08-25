import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/heading";
import { BUSINESS_NAME, ROOM_PATH } from "@/lib/business";

export function PropertyIntroSection() {
  return (
    <Section band="canvas" fade={false}>
      <Container>
        <Stack gap="md" className="max-w-3xl">
          <Heading as="h2" size="section">
            One room. You choose how many guests.
          </Heading>
          <Text tone="muted">
            {BUSINESS_NAME} has one room:{" "}
            <Link href={ROOM_PATH} className="text-mangrove-fg underline">
              the Deluxe AC Room
            </Link>
            . The nightly rate depends on how many guests share it — 2, 3, 4, 6, or 8 —
            so a family of six books one room, not several stays. This is a single
            homestay: when you message us, you&apos;re talking to the host.
          </Text>
          <Text size="sm" tone="muted">
            The room is air-conditioned and has a bathroom. Nightly rates include GST.
          </Text>
        </Stack>
      </Container>
    </Section>
  );
}
