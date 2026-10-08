import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { MovingPartsPanel } from "@/components/sections/moving-parts-panel";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ArrowLink } from "@/components/ui/arrow-link";
import { routes } from "@/config/routes";
import { servicesOverviewContent } from "@/content/services/overview";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Port & Vessel Logistics Services (UAE)",
  description:
    "Oar's six services, from port logistics and delivery to the vessel to customs, warehousing, transport and port coordination, connected from supplier to vessel.",
  path: routes.services,
});

export default function ServicesPage() {
  const { hero, intro, grid, process, audiences, cta } = servicesOverviewContent;

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Services" }]} path={routes.services} />
      <InnerPageHero {...hero} />
      <NarrativeSection id="intro" {...intro} aside={<MovingPartsPanel />} />
      <Section surface="muted" labelledBy="services-grid-title">
        <SectionHeader
          eyebrow={grid.eyebrow}
          title={grid.title}
          description={grid.description}
          titleId="services-grid-title"
        />
        <CapabilityGrid linkTo="detail" linkLabel={grid.cardLinkLabel} />
      </Section>
      <ProcessSection surface="light" {...process} />
      <Section surface="muted" labelledBy="audiences-title">
        <SectionHeader
          eyebrow={audiences.eyebrow}
          title={audiences.title}
          description={audiences.description}
          titleId="audiences-title"
          action={<ArrowLink href={audiences.action.href}>{audiences.action.label}</ArrowLink>}
        />
        <IndustryGrid />
      </Section>
      <CtaSection {...cta} />
    </>
  );
}
