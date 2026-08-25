import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/heading";
import { extraBedFaq, STATIC_FAQS } from "@/lib/seo/faqs";
import { getPublicPricing } from "@/lib/pricing/fetch";

const pendingFaq = [
  { q: "What are check-in and check-out times?", item: "checkInOut" as const, n: 4 },
  { q: "Is parking available?", item: "parking" as const, n: 6 },
  { q: "Do you have Wi-Fi?", item: "wifi" as const, n: 7 },
  { q: "What is your cancellation policy?", item: "cancellation" as const, n: 5 },
];

export async function FaqSection() {
  const pricing = await getPublicPricing();
  const extra = extraBedFaq(pricing);

  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <Heading as="h2" size="section">
            Frequently asked questions
          </Heading>
          <div className="grid gap-4">
            {STATIC_FAQS.map((item) => (
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
            {extra ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{extra.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text size="sm" tone="muted">
                    {extra.a}
                  </Text>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Is there an extra bed charge?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TodoNotice
                    item="extraBedPolicy"
                    detail="Extra bed rate will appear here when the owner publishes pricing (checklist #12–#13)."
                  />
                </CardContent>
              </Card>
            )}
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
