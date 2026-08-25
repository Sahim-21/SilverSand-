import type { Metadata } from "next";
import Link from "next/link";

import { BookingWidget } from "@/components/booking/booking-widget";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhotoFrame } from "@/components/ui/photo-frame";

import { noIndexMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = noIndexMetadata("Style guide");

const colours = [
  { name: "Sand", className: "bg-sand border border-line", value: "#F4EFE6" },
  { name: "Sand deep", className: "bg-sand-deep", value: "#E8DFD0" },
  { name: "Surface", className: "bg-surface border border-line", value: "#FFFCF7" },
  { name: "Ink", className: "bg-ink", value: "#1C1914" },
  { name: "Muted", className: "bg-muted", value: "#5E574C" },
  { name: "Mangrove", className: "bg-mangrove", value: "#1A2B24" },
  { name: "Mangrove mid", className: "bg-mangrove-mid", value: "#243830" },
  { name: "Gold", className: "bg-gold", value: "#C4A35A" },
  { name: "WhatsApp", className: "bg-whatsapp", value: "#128C7E" },
  { name: "Danger", className: "bg-danger", value: "#B42318" },
] as const;

export default function StyleGuidePage() {
  return (
    <Container className="pb-section">
      <Section className="pb-10">
        <Stack gap="sm">
          <p className="text-sm font-medium text-mangrove">Internal — not indexed</p>
          <Heading as="h1" size="display">
            Style guide
          </Heading>
          <Text tone="muted" className="max-w-prose">
            Rendered tokens and primitives for Silver Sand Beach Homestay. Use this page
            when adding UI. Public pages must not invent amenities, prices, or photos.
            See{" "}
            <Link href="/" className="text-mangrove underline">
              Home
            </Link>{" "}
            for the live layout.
          </Text>
        </Stack>
      </Section>

      <Stack gap="xl">
        <section>
          <Heading as="h2" size="section" className="mb-6">
            Colour
          </Heading>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {colours.map((swatch) => (
              <div key={swatch.name} className="space-y-2">
                <div className={`h-16 rounded-md ${swatch.className}`} />
                <p className="text-sm font-medium text-ink">{swatch.name}</p>
                <p className="text-xs tabular-nums text-muted">{swatch.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading as="h2" size="section" className="mb-6">
            Typography
          </Heading>
          <Stack gap="md">
            <Heading as="h1" size="display">
              Homestay in Murudeshwar
            </Heading>
            <Heading as="h2" size="title">
              Deluxe AC Room
            </Heading>
            <Heading as="h3" size="section">
              Occupancy pricing
            </Heading>
            <Text>
              Body copy. Source Sans 3, 1rem, relaxed leading. Used for stay details and
              house rules we actually have.
            </Text>
            <Text size="sm" tone="muted">
              Muted small print — estimates, disclaimers, photo captions.
            </Text>
            <p className="font-serif text-gold-muted">
              Gold accent on dark panels only — not for body text on sand.
            </p>
            <p className="tabular-nums text-ink">
              ₹ 0 1 2 3 4 5 6 7 8 9 — tabular lining
            </p>
          </Stack>
        </section>

        <section>
          <Heading as="h2" size="section" className="mb-6">
            Spacing
          </Heading>
          <Stack gap="form">
            <div className="h-4 w-16 bg-mangrove" title="space 4" />
            <div className="h-4 w-form bg-mangrove" title="form group" />
            <div className="h-4 w-24 bg-mangrove" title="space 6" />
            <Text size="sm" tone="muted">
              Form groups use <code className="text-ink">gap-form</code> (1.5rem). Page
              sections use <code className="text-ink">py-section</code>. Gutters are{" "}
              <code className="text-ink">px-gutter</code> /{" "}
              <code className="text-ink">px-gutter-md</code>.
            </Text>
          </Stack>
        </section>

        <section>
          <Heading as="h2" size="section" className="mb-6">
            Buttons
          </Heading>
          <div className="flex flex-wrap gap-3">
            <Button>Default (mangrove)</Button>
            <Button variant="gold">Gold (on dark)</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="call">Call</Button>
            <Button variant="whatsapp">Check Availability on WhatsApp</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section>
          <Heading as="h2" size="section" className="mb-6">
            Inputs
          </Heading>
          <div className="grid gap-8 md:grid-cols-2">
            <Stack gap="form">
              <div>
                <Label htmlFor="guide-checkin" className="mb-2">
                  Check-in
                </Label>
                <Input id="guide-checkin" type="date" surface="light" />
              </div>
              <div>
                <Label htmlFor="guide-guests" className="mb-2">
                  Occupancy
                </Label>
                <Input id="guide-guests" placeholder="2 sharing" surface="light" />
              </div>
            </Stack>
            <Card tone="dark">
              <CardHeader>
                <CardTitle className="text-gold">On dark panel</CardTitle>
                <CardDescription className="text-sand/80">
                  Soft-rounded fields, thin light border, generous group spacing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="guide-dark-in" className="mb-2 text-sand">
                    Check-in
                  </Label>
                  <Input id="guide-dark-in" type="date" surface="dark" />
                </div>
                <div>
                  <Label htmlFor="guide-dark-out" className="mb-2 text-sand">
                    Check-out
                  </Label>
                  <Input id="guide-dark-out" type="date" surface="dark" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Heading as="h2" size="section" className="mb-6">
            Cards, alert, photo frame
          </Heading>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Surface card</CardTitle>
                <CardDescription>Default for admin and light content.</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  Pricing unavailable — call or WhatsApp. No rupee total shown.
                </Alert>
              </CardContent>
              <CardFooter>
                <Button size="full">Save</Button>
              </CardFooter>
            </Card>
            <PhotoFrame alt="Specimen empty photo frame — no property photograph yet" />
          </div>
          <Alert tone="danger" className="mt-6">
            Form error example — occupancy rates must be positive integers.
          </Alert>
        </section>

        <section>
          <Heading as="h2" size="section" className="mb-6">
            Booking widget
          </Heading>
          <Text tone="muted" className="mb-6 max-w-prose">
            Live mangrove panel. Estimates come from GET /api/pricing only. Until the
            owner publishes rates, the results box stays enquire-only with no rupee
            fallback.
          </Text>
          <div className="max-w-md">
            <BookingWidget />
          </div>
        </section>
      </Stack>
    </Container>
  );
}
