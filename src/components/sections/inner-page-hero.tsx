import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import type { Crumb } from "@/lib/seo/json-ld";

type InnerPageHeroProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  crumbs?: readonly Crumb[];
};

export function InnerPageHero({
  title,
  description,
  eyebrow,
  crumbs,
}: InnerPageHeroProps) {
  return (
    <Section className="border-b border-line bg-surface pb-10 pt-10">
      <Container>
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          crumbs={crumbs}
        />
      </Container>
    </Section>
  );
}
