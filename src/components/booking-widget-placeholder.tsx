import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/heading";
import {
  BUSINESS_PLACE,
  DISPLAY_PHONE,
  ROOM_NAME,
  TEL_URL,
  WHATSAPP_URL,
} from "@/lib/business";
import { cn } from "@/lib/utils";

export function BookingWidgetPlaceholder() {
  return (
    <Card tone="dark" className="w-full">
      <CardHeader>
        <CardTitle className="text-gold">Book your stay</CardTitle>
        <CardDescription className="text-sand/80">
          Pick dates and occupancy for a live estimate once the owner has set rates in
          the admin panel. Until then, message us directly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm font-medium text-sand">{ROOM_NAME}</p>
          <Text size="xs" className="mt-1 text-sand/70">
            Occupancy pricing (2 / 3 / 4 / 6 / 8 sharing) + extra bed — rates from the
            database only, not hardcoded here.
          </Text>
        </div>
        <Text size="xs" className="text-sand/70">
          Estimate only, subject to availability.
        </Text>
      </CardContent>
      <CardFooter>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "whatsapp", size: "full" }))}
        >
          Check Availability on WhatsApp
        </a>
        <a
          href={TEL_URL}
          className={cn(buttonVariants({ variant: "outline-on-dark", size: "full" }))}
        >
          Call {DISPLAY_PHONE}
        </a>
        <Text size="xs" className="text-center text-sand/60">
          {BUSINESS_PLACE}
        </Text>
      </CardFooter>
    </Card>
  );
}
