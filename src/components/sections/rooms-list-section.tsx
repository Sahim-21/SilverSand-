import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { OccupancyPricing } from "@/components/marketing/occupancy-pricing";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/heading";
import { ROOM_NAME, ROOM_PATH } from "@/lib/business";
import { cn } from "@/lib/utils";

export function RoomsListSection() {
  return (
    <Section>
      <Container>
        <Stack gap="lg" className="max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>{ROOM_NAME}</CardTitle>
              <Text size="sm" tone="muted">
                Air-conditioned. Priced per night based on occupancy — 2, 3, 4, 6, or 8
                guests sharing. One extra bed can be added when the owner confirms it is
                available; the per-person charge is shown on the room page when
                published. Bed layout and full amenity list are pending owner
                confirmation.
              </Text>
            </CardHeader>
            <CardContent className="gap-6">
              <OccupancyPricing />
              <Link href={ROOM_PATH} className={cn(buttonVariants(), "w-fit")}>
                Room details and booking widget
              </Link>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
}
