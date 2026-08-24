import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/heading";
import { ROOM_NAME } from "@/lib/business";
import { getPublicPricing } from "@/lib/pricing/fetch";
import { formatInr } from "@/lib/pricing/estimate";

const staticFaq = [
  {
    q: "How do I book?",
    a: "Message us on WhatsApp or call +91 99862 22892 with your dates and how many guests will share the room. We confirm availability ourselves — there is no instant OTA checkout on this site.",
  },
  {
    q: "What room types do you have?",
    a: `One type only: ${ROOM_NAME}, with occupancy-based pricing for 2, 3, 4, 6, or 8 sharing.`,
  },
  {
    q: "Are the prices on the website final?",
    a: "They are estimates from our published occupancy rates. We confirm the total on WhatsApp before you travel.",
  },
];

export async function FaqSection() {
  const pricing = await getPublicPricing();
  const extraBedAnswer = pricing
    ? `Extra bed is currently ${formatInr(pricing.room.extraBedRateInr)} per person per night when offered (owner-set; confirm whether this is per night on WhatsApp — checklist #13).`
    : "Extra bed rate will appear here when the owner publishes pricing (checklist #12–#13).";

  const pendingFaq = [
    { q: "What are check-in and check-out times?", item: "checkInOut" as const, n: 4 },
    { q: "Is parking available?", item: "parking" as const, n: 6 },
    { q: "Do you have Wi-Fi?", item: "wifi" as const, n: 7 },
    { q: "What is your cancellation policy?", item: "cancellation" as const, n: 5 },
  ];

  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <Heading as="h2" size="section">
            Frequently asked questions
          </Heading>
          <div className="grid gap-4">
            {staticFaq.map((item) => (
              <Card key={item.q}>
                <CardHeader>
                  <CardTitle className="text-base">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text size="sm" tone="muted">
                    {item.a}
                  </Text>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Is there an extra bed charge?</CardTitle>
              </CardHeader>
              <CardContent>
                <Text size="sm" tone="muted">
                  {extraBedAnswer}
                </Text>
              </CardContent>
            </Card>
            {pendingFaq.map((item) => (
              <Card key={item.q}>
                <CardHeader>
                  <CardTitle className="text-base">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TodoNotice
                    item={item.item}
                    detail={`Answer pending owner input (checklist #${item.n}).`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
