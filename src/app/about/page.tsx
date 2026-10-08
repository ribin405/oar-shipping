import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { PrincipleGrid } from "@/components/sections/principle-grid";
import { SupplierVesselFlow } from "@/components/sections/supplier-vessel-flow";
import { ArrowLink } from "@/components/ui/arrow-link";
import { routes } from "@/config/routes";
import { aboutContent, aboutPrinciples } from "@/content/about/page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "About Oar | Marine Logistics & Port Execution" },
  description:
    "Oar focuses on marine logistics and port execution, coordinating suppliers, cargo and vessel requirements across the UAE maritime environment.",
  path: routes.about,
});

export default function AboutPage() {
  const { hero, positioning, focus, principles, cta } = aboutContent;

  return (
    <>
      <InnerPageHero {...hero} />
      <NarrativeSection id="positioning" {...positioning} />
      <SupplierVesselFlow />
      <Section surface="muted" labelledBy="focus-title">
        <SectionHeader
          eyebrow={focus.eyebrow}
          title={focus.title}
          description={focus.description}
          titleId="focus-title"
          action={<ArrowLink href={focus.action.href}>{focus.action.label}</ArrowLink>}
        />
        <CapabilityGrid linkTo="detail" linkLabel="Explore service" />
      </Section>
      <Section labelledBy="principles-title">
        <SectionHeader
          eyebrow={principles.eyebrow}
          title={principles.title}
          titleId="principles-title"
          action={<ArrowLink href={principles.action.href}>{principles.action.label}</ArrowLink>}
        />
        <PrincipleGrid principles={aboutPrinciples} />
      </Section>
      <CtaSection {...cta} />
    </>
  );
}
