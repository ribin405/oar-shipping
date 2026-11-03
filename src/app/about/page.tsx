import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CtaSection } from "@/components/sections/cta-section";
import { DivisionsSection } from "@/components/sections/divisions-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { aboutContent } from "@/content/about/page";
import { finalCtaContent } from "@/content/home/final-cta";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPageNode } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "About Oar Shipping | UAE Marine Services Group, Fujairah" },
  description:
    "Oar Shipping is a UAE marine services group based in Fujairah: ship chandling, customs and logistics, marine services and PDA review with one point of contact.",
  path: routes.about,
});

export default function AboutPage() {
  const { hero, advantage, group } = aboutContent;

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "About" }]} path={routes.about} />
      <JsonLd data={buildPageNode("AboutPage", routes.about, metadata)} />
      <InnerPageHero {...hero} />
      <DivisionsSection index="01" />
      <Section labelledBy="advantage-title">
        <SectionHeader index="02" eyebrow={advantage.eyebrow} title={advantage.title} titleId="advantage-title" />
        <ul className="ruled ruled--numbered">
          {advantage.points.map(({ title, text }) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section labelledBy="group-title">
        <SectionHeader index="03" eyebrow={group.eyebrow} title={group.title} titleId="group-title" />
        <ul className="ruled">
          {(contactDetails.offices ?? []).map(({ company, role, locality }) => (
            <li key={company}>
              <strong>{company}</strong>
              <span>
                {role} · {locality}, UAE
              </span>
            </li>
          ))}
        </ul>
      </Section>
      <CtaSection {...finalCtaContent} />
    </>
  );
}
