import Link from "next/link";

import type { SectionBand } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { BookNowButton } from "@/components/marketing/book-now-button";
import { OccupancyRoomImage } from "@/components/marketing/occupancy-room-image";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/heading";
import { BOOKING_HASH } from "@/lib/booking/anchor";
import { OCCUPANCY_TIERS } from "@/lib/business";
import { cn } from "@/lib/utils";

type PhotosSectionProps = {
  showGalleryLink?: boolean;
  bookingHref?: string;
  band?: SectionBand;
};

export function PhotosSection({
  showGalleryLink = true,
  bookingHref = BOOKING_HASH,
  band,
}: PhotosSectionProps) {
  return (
    <Section band={band}>
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Photos
            </Heading>
            <Text tone="muted" className="mt-2">
              The Deluxe AC Room as it looks for 2, 3, 4, 6, and 8 guests sharing.
            </Text>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OCCUPANCY_TIERS.map((tier) => (
              <OccupancyRoomImage
                key={tier}
                occupancy={tier}
                caption={`${tier} sharing`}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <BookNowButton href={bookingHref} />
            {showGalleryLink ? (
              <Link
                href="/gallery"
                className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
              >
                View gallery
              </Link>
            ) : null}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
