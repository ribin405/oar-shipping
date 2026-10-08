import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { JourneyDiagram } from "@/components/sections/journey-diagram";
import { MovingPartsPanel } from "@/components/sections/moving-parts-panel";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { PrincipleGrid } from "@/components/sections/principle-grid";
import { CheckList } from "@/components/ui/check-list";
import { routes } from "@/config/routes";
import { whyOarPageContent, whyOarPrinciples } from "@/content/why-oar/page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Why Oar | UAE Marine Logistics & Port Execution" },
  description:
    "Why Oar coordinates the shore-side activities between supplier and vessel: one operating model for cargo, documentation, transport and port-side execution in the UAE.",
  path: routes.whyOar,
});

export default function WhyOarPage() {
  const { hero, challenge, role, principles, visibility, cta } = whyOarPageContent;

  return (
    <>
      <InnerPageHero {...hero} />
      <NarrativeSection id="challenge" {...challenge} aside={<MovingPartsPanel />} />
      <NarrativeSection
        id="role"
        surface="dark"
        eyebrow={role.eyebrow}
        title={role.title}
        paragraphs={role.paragraphs}
        action={role.action}
        aside={<JourneyDiagram heading={role.diagramHeading} nodes={role.nodes} />}
      />
      <Section surface="muted" labelledBy="principles-title">
        <SectionHeader eyebrow={principles.eyebrow} title={principles.title} titleId="principles-title" />
        <PrincipleGrid principles={whyOarPrinciples} />
      </Section>
      <NarrativeSection
        id="visibility"
        eyebrow={visibility.eyebrow}
        title={visibility.title}
        paragraphs={visibility.paragraphs}
        aside={
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <CheckList items={visibility.points} className="type-body-lg gap-4 text-foreground" />
          </div>
        }
      />
      <CtaSection {...cta} />
    </>
  );
}
