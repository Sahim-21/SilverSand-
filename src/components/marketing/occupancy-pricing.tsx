import { BookNowButton } from "@/components/marketing/book-now-button";
import { OccupancyRoomImage } from "@/components/marketing/occupancy-room-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/heading";
import { OCCUPANCY_TIERS, ROOM_NAME } from "@/lib/business";
import { formatInr } from "@/lib/pricing/estimate";
import { getPublicPricing } from "@/lib/pricing/fetch";

type OccupancyPricingProps = {
  /** Hash or path to the booking widget (`#booking` or `/rooms/deluxe-ac-room#booking`). */
  bookingHref: string;
};

export async function OccupancyPricing({ bookingHref }: OccupancyPricingProps) {
  const pricing = await getPublicPricing();

  if (!pricing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{ROOM_NAME} — occupancy rates</CardTitle>
        </CardHeader>
        <CardContent className="gap-4">
          <OccupancyImageGrid bookingHref={bookingHref} />
          <Text size="sm" tone="muted">
            Occupancy rates aren&apos;t loading right now. Message us on WhatsApp for
            today&apos;s rate — we don&apos;t show a guessed rupee amount.
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pricing.room.name} — per night by sharing</CardTitle>
        <Text size="sm" tone="muted">
          Per night, by how many guests share the room. We confirm the total on
          WhatsApp.
        </Text>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OCCUPANCY_TIERS.map((tier) => {
            const row = pricing.occupancyRates.find((r) => r.occupancy === tier);
            const amount = row?.nightlyRateInr ?? 0;
            return (
              <article
                key={tier}
                className="flex flex-col overflow-hidden rounded-lg border border-line bg-sand"
              >
                <OccupancyRoomImage occupancy={tier} className="rounded-none" />
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <p className="font-medium text-ink">{tier} sharing</p>
                  <p className="tabular-nums font-medium text-ink">
                    {amount > 0 ? formatInr(amount) : "—"}
                    {amount > 0 ? (
                      <span className="ml-1 text-xs font-normal text-muted">
                        / night
                      </span>
                    ) : null}
                  </p>
                  <BookNowButton href={bookingHref} size="full" className="mt-auto" />
                </div>
              </article>
            );
          })}
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4">
          <Text size="sm">Extra bed / person</Text>
          <Text size="sm" className="tabular-nums font-medium">
            {pricing.room.extraBedRateInr > 0 ? (
              <>
                {formatInr(pricing.room.extraBedRateInr)}
                <span className="ml-1 text-xs font-normal text-muted">
                  per person / night
                </span>
              </>
            ) : (
              <span className="font-normal text-muted">Not offered</span>
            )}
          </Text>
        </div>
      </CardContent>
    </Card>
  );
}

function OccupancyImageGrid({ bookingHref }: { bookingHref: string }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {OCCUPANCY_TIERS.map((tier) => (
        <article
          key={tier}
          className="flex flex-col overflow-hidden rounded-lg border border-line bg-sand"
        >
          <OccupancyRoomImage occupancy={tier} className="rounded-none" />
          <div className="flex flex-1 flex-col gap-3 p-4">
            <p className="font-medium text-ink">{tier} sharing</p>
            <BookNowButton href={bookingHref} size="full" className="mt-auto" />
          </div>
        </article>
      ))}
    </div>
  );
}
