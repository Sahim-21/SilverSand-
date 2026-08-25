import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { BookNowButton } from "@/components/marketing/book-now-button";
import { OccupancyPricing } from "@/components/marketing/occupancy-pricing";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/heading";
import { ROOM_BOOKING_HREF } from "@/lib/booking/anchor";
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
                Air-conditioned, with a bathroom. Nightly rate for 2, 3, 4, 6, or 8
                guests sharing — GST included. Extra beds can be added up to eight
                guests in total; the per-person charge is below.
              </Text>
            </CardHeader>
            <CardContent className="gap-6">
              <OccupancyPricing bookingHref={ROOM_BOOKING_HREF} />
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BookNowButton href={ROOM_BOOKING_HREF} />
                <Link href={ROOM_PATH} className={cn(buttonVariants(), "w-fit")}>
                  Room details and dates
                </Link>
              </div>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
}
