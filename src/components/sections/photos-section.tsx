import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/heading";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { cn } from "@/lib/utils";

type PhotosSectionProps = {
  showGalleryLink?: boolean;
};

export function PhotosSection({ showGalleryLink = true }: PhotosSectionProps) {
  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Photos
            </Heading>
            <Text tone="muted" className="mt-2">
              Real photographs from the owner will replace these placeholders. We do not
              use stock villa images.
            </Text>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PhotoFrame
              ratio="wide"
              alt="Exterior of Silver Sand Beach Homestay in Murudeshwar — photograph pending from the owner"
              caption="Exterior — pending owner photos (#2)"
            />
            <PhotoFrame
              ratio="room"
              alt="Deluxe AC Room interior at Silver Sand Beach Homestay — photograph pending from the owner"
              caption="Deluxe AC Room — pending (#2)"
            />
            <PhotoFrame
              ratio="room"
              alt="Bathroom of the Deluxe AC Room — photograph pending from the owner"
              caption="Bathroom — pending (#2)"
            />
          </div>
          <TodoNotice item="photos" />
          {showGalleryLink ? (
            <Link
              href="/gallery"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              View gallery
            </Link>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
