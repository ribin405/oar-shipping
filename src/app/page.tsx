import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CtaSection } from "@/components/sections/cta-section";
import { DivisionsSection } from "@/components/sections/divisions-section";
import { FactsStrip } from "@/components/sections/facts-strip";
import { HeroSection } from "@/components/sections/hero-section";
import { PdaSection } from "@/components/sections/pda-section";
import { PortCallSection } from "@/components/sections/port-call-section";
import { PortsSection } from "@/components/sections/ports-section";
import { WhyOarSection } from "@/components/sections/why-oar-section";
import { finalCtaContent } from "@/content/home/final-cta";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildSiteGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Oar Shipping | Ship Chandling, Customs & Marine Services, UAE" },
  description:
    "Ship chandling, customs clearance, logistics and marine services across all UAE ports, with independent PDA review for ship owners and a 24/7 operations desk.",
  path: routes.home,
});

/** Homepage: hero, facts, divisions, how a port call runs, ports, why Oar, PDA review and one closing call to action. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={buildSiteGraph()} />
      <HeroSection />
      <FactsStrip />
      <DivisionsSection index="01" />
      <PortCallSection index="02" />
      <PortsSection />
      <WhyOarSection index="04" />
      <PdaSection index="05" />
      <CtaSection {...finalCtaContent} />
    </>
  );
}
