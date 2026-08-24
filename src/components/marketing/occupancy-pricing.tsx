import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/heading";
import { OCCUPANCY_TIERS, ROOM_NAME } from "@/lib/business";
import { formatInr } from "@/lib/pricing/estimate";
import { getPublicPricing } from "@/lib/pricing/fetch";
import { TodoNotice } from "@/components/marketing/todo-notice";

export async function OccupancyPricing() {
  const pricing = await getPublicPricing();

  if (!pricing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{ROOM_NAME} — occupancy rates</CardTitle>
        </CardHeader>
        <CardContent className="gap-4">
          <TodoNotice
            item="occupancyRates"
            detail="Nightly rates for 2 / 3 / 4 / 6 / 8 sharing are not published yet. The owner sets them in the admin panel — we do not hardcode prices on this site. Message us on WhatsApp for today’s rate."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pricing.room.name} — per night by sharing</CardTitle>
        <Text size="sm" tone="muted">
          Rates below are loaded from the database. Estimate only — we confirm on
          WhatsApp.
        </Text>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="pb-3 pr-4 font-medium">Guests sharing</th>
                <th className="pb-3 font-medium tabular-nums">₹ / night</th>
              </tr>
            </thead>
            <tbody>
              {OCCUPANCY_TIERS.map((tier) => {
                const row = pricing.occupancyRates.find((r) => r.occupancy === tier);
                const amount = row?.nightlyRateInr ?? 0;
                return (
                  <tr key={tier} className="border-b border-line/60">
                    <td className="py-3 pr-4">{tier} sharing</td>
                    <td className="py-3 tabular-nums font-medium">
                      {amount > 0 ? formatInr(amount) : "—"}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td className="py-3 pr-4">Extra bed / person</td>
                <td className="py-3 tabular-nums font-medium">
                  {pricing.room.extraBedRateInr > 0 ? (
                    <>
                      {formatInr(pricing.room.extraBedRateInr)}
                      <span className="ml-1 text-xs font-normal text-muted">
                        (per night — confirm with owner)
                      </span>
                    </>
                  ) : (
                    <span className="font-normal text-muted">Not offered</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
