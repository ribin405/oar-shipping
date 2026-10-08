import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { JourneyDiagram } from "@/components/sections/journey-diagram";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { ArrowLink } from "@/components/ui/arrow-link";
import { routes } from "@/config/routes";
import { industriesPageContent } from "@/content/industries/page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Industries: Ship Managers, Chandlers & Agents",
  description:
    "Who Oar supports: ship managers, chandlers and marine suppliers, shipping agents, forwarders and marine and offshore operators moving cargo to vessels in the UAE.",
  path: routes.industries,
});

export default function IndustriesPage() {
  const { hero, audiences, shared, capabilities, cta } = industriesPageContent;

  return (
    <>
      <InnerPageHero {...hero} />
      <Section labelledBy="audiences-title">
        <SectionHeader
          eyebrow={audiences.eyebrow}
          title={audiences.title}
          description={audiences.description}
          titleId="audiences-title"
        />
        <IndustryGrid variant="detail" />
      </Section>
      <NarrativeSection
        id="shared"
        surface="dark"
        eyebrow={shared.eyebrow}
        title={shared.title}
        paragraphs={shared.paragraphs}
        action={shared.action}
        aside={<JourneyDiagram heading={shared.diagramHeading} nodes={shared.nodes} orientation="responsive" />}
      />
      <Section surface="muted" labelledBy="capabilities-title">
        <SectionHeader
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          description={capabilities.description}
          titleId="capabilities-title"
          action={<ArrowLink href={capabilities.action.href}>{capabilities.action.label}</ArrowLink>}
        />
        <CapabilityGrid linkTo="detail" linkLabel="Explore service" />
      </Section>
      <CtaSection {...cta} />
    </>
  );
}
