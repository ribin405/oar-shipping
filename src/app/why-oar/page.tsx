import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { PdaSection } from "@/components/sections/pda-section";
import { PortCallSection } from "@/components/sections/port-call-section";
import { WhyOarSection } from "@/components/sections/why-oar-section";
import { JsonLd } from "@/components/seo/json-ld";
import { routes } from "@/config/routes";
import { finalCtaContent } from "@/content/home/final-cta";
import { whyOarPageContent } from "@/content/why-oar/page";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPageNode } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Why Oar Shipping | One Partner for Every UAE Port Call" },
  description:
    "One point of contact for supply, clearance and marine services, a 24/7 operations desk, transparent costs with PDA review, and proper documents on every job.",
  path: routes.whyOar,
});

/** Why Oar: the homepage blocks in more depth, so the two pages cannot disagree. */
export default function WhyOarPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Why Oar" }]} path={routes.whyOar} />
      <JsonLd data={buildPageNode("WebPage", routes.whyOar, metadata)} />
      <InnerPageHero {...whyOarPageContent.hero} layout="split" />
      <WhyOarSection index="01" showAction={false} />
      <PortCallSection index="02" />
      <PdaSection index="03" />
      <CtaSection {...finalCtaContent} />
    </>
  );
}
