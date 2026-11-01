import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CoverageSection } from "@/components/sections/coverage-section";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { PortCallSection } from "@/components/sections/port-call-section";
import { JsonLd } from "@/components/seo/json-ld";
import { routes } from "@/config/routes";
import { serviceCapabilities } from "@/content/services/capabilities";
import { servicesOverviewContent } from "@/content/services/overview";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPageNode } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Ship Chandling, Customs, Logistics & Marine Services",
  description:
    "Oar's four divisions: ship chandling, customs and logistics, marine services and an independent PDA review for ship owners, across all UAE ports.",
  path: routes.services,
});

export default function ServicesPage() {
  const { hero, grid, coverage, cta } = servicesOverviewContent;

  return (
    <>
      <JsonLd data={buildPageNode("CollectionPage", routes.services, metadata, serviceCapabilities.map(({ slug, title }) => ({ name: title, path: routes.service(slug) })))} />
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Services" }]} path={routes.services} />
      <InnerPageHero {...hero} />
      <Section labelledBy="services-grid-title">
        <SectionHeader
          eyebrow={grid.eyebrow}
          title={grid.title}
          description={grid.description}
          titleId="services-grid-title"
        />
        <CapabilityGrid linkTo="detail" linkLabel={grid.cardLinkLabel} />
      </Section>
      <PortCallSection />
      <CoverageSection id="coverage-title" {...coverage} />
      <CtaSection {...cta} />
    </>
  );
}
