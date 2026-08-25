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
                One room type with occupancy-based pricing for families and groups. Bed
                layout and amenities are listed on the room page when the owner confirms
                them.
              </Text>
            </CardHeader>
            <CardContent className="gap-6">
              <OccupancyPricing />
              <Link href={ROOM_PATH} className={cn(buttonVariants(), "w-fit")}>
                View room details
              </Link>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
}
