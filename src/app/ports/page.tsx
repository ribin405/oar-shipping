import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { JourneyDiagram } from "@/components/sections/journey-diagram";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { PortGrid } from "@/components/sections/port-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { CompassPattern } from "@/components/ui/compass-pattern";
import { CheckList } from "@/components/ui/check-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/config/routes";
import { ports } from "@/content/ports";
import { coveragePorts, otherPortsLabel } from "@/content/ports/coverage";
import { portsOverviewContent } from "@/content/ports/overview";
import { lowerFirst } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "UAE Ports We Cover",
  description: `Oar covers ${coveragePorts.join(", ")} and ${lowerFirst(otherPortsLabel)}.`,
  path: routes.ports,
});

export default function PortsPage() {
  const { hero, positioning, locations, requirement, services, cta } = portsOverviewContent;

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Ports & Locations" }]} path={routes.ports} />
      <InnerPageHero {...hero} visual={<CompassPattern className="hidden lg:block" />} />

      <NarrativeSection
        id="positioning"
        eyebrow={positioning.eyebrow}
        title={positioning.title}
        paragraphs={positioning.paragraphs}
        aside={<JourneyDiagram heading={positioning.diagramHeading} nodes={positioning.nodes} />}
      />

      {ports.length > 0 ? (
        <Section labelledBy="locations-title">
          <SectionHeader
            eyebrow={locations.eyebrow}
            title={locations.title}
            description={locations.description}
            titleId="locations-title"
          />
          <PortGrid ports={ports} className="lg:grid-cols-3" />
        </Section>
      ) : (
        <Section labelledBy="requirement-title">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <Eyebrow>{requirement.eyebrow}</Eyebrow>
              <h2 id="requirement-title" className="type-h1">
                {requirement.title}
              </h2>
              <p className="type-body-lg text-muted">{requirement.description}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <CheckList items={requirement.items} className="type-body-lg gap-4 text-foreground" />
            </div>
          </div>
        </Section>
      )}

      <Section labelledBy="services-title">
        <SectionHeader
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
          titleId="services-title"
          action={<ArrowLink href={services.action.href}>{services.action.label}</ArrowLink>}
        />
        <CapabilityGrid linkTo="detail" linkLabel="Explore service" />
      </Section>

      <CtaSection {...cta} />
    </>
  );
}
