import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CapabilityStrip } from "@/components/sections/capability-strip";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { PortsSection } from "@/components/sections/ports-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SupplierVesselFlow } from "@/components/sections/supplier-vessel-flow";
import { WhyOarSection } from "@/components/sections/why-oar-section";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildSiteGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Oar Shipping | Marine Logistics & Port Execution in the UAE" },
  description:
    "Oar Shipping coordinates the shore-side journey from supplier to vessel: marine logistics and port execution in the UAE for ship managers, chandlers and agents.",
  path: routes.home,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildSiteGraph()} />
      <div data-home-theme>
        <HeroSection>
          <CapabilityStrip />
        </HeroSection>
        <ProblemSection />
        <SupplierVesselFlow />
        <ServicesSection />
        <PortsSection />
        <IndustriesSection />
        <WhyOarSection />
        <InsightsSection />
        <FinalCtaSection />
      </div>
    </>
  );
}
