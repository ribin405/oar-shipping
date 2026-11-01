import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { routes } from "@/config/routes";
import { finalCtaContent } from "@/content/home/final-cta";
import { industriesPageContent } from "@/content/industries/page";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPageNode } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Industries: Ship Managers, Chandlers & Agents",
  description:
    "Who Oar supports: ship managers, chandlers and marine suppliers, shipping agents, forwarders and marine and offshore operators moving cargo to vessels in the UAE.",
  path: routes.industries,
});

export default function IndustriesPage() {
  const { hero, audiences, shared, capabilities } = industriesPageContent;

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Industries" }]} path={routes.industries} />
      <JsonLd data={buildPageNode("WebPage", routes.industries, metadata)} />
      <InnerPageHero {...hero} />
      <Section labelledBy="audiences-title">
        <SectionHeader
          index="01"
          eyebrow={audiences.eyebrow}
          title={audiences.title}
          description={audiences.description}
          titleId="audiences-title"
        />
        <IndustryGrid variant="detail" layout="rows" />
      </Section>
      <Section labelledBy="shared-title">
        <SectionHeader
          index="02"
          eyebrow={shared.eyebrow}
          title={shared.title}
          description={shared.paragraphs[0]}
          titleId="shared-title"
          className="mb-0 md:mb-0"
          action={<ArrowLink href={shared.action.href}>{shared.action.label}</ArrowLink>}
        />
      </Section>
      <Section labelledBy="capabilities-title">
        <SectionHeader
          index="03"
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          description={capabilities.description}
          titleId="capabilities-title"
          action={<ArrowLink href={capabilities.action.href}>{capabilities.action.label}</ArrowLink>}
        />
        <CapabilityGrid linkTo="detail" linkLabel="Explore service" />
      </Section>
      <CtaSection {...finalCtaContent} />
    </>
  );
}
