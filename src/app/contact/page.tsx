import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ContactChannelList } from "@/components/sections/contact-channels";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { JourneyDiagram } from "@/components/sections/journey-diagram";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { PrincipleGrid } from "@/components/sections/principle-grid";
import { CheckList } from "@/components/ui/check-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { contactContent, engagementPaths } from "@/content/contact/page";
import { getContactChannels } from "@/lib/contact";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Contact Oar Shipping | Marine Logistics & Port Execution" },
  description:
    "Discuss a marine logistics, port-execution or vessel-support requirement with Oar. Share the cargo, location, port and timing so the requirement can be assessed.",
  path: routes.contact,
});

export default function ContactPage() {
  const { hero, intro, engage, guidance, details, cta } = contactContent;
  const channels = getContactChannels(contactDetails);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Contact" }]} path={routes.contact} />
      <InnerPageHero {...hero} />

      <NarrativeSection
        id="intro"
        eyebrow={intro.eyebrow}
        title={intro.title}
        paragraphs={intro.paragraphs}
        aside={<JourneyDiagram heading={intro.diagramHeading} nodes={intro.nodes} />}
      />

      <Section surface="muted" labelledBy="engage-title">
        <SectionHeader eyebrow={engage.eyebrow} title={engage.title} titleId="engage-title" />
        <PrincipleGrid principles={engagementPaths} />
      </Section>

      <Section surface="dark" labelledBy="guidance-title">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex max-w-2xl flex-col items-start gap-4">
            <Eyebrow>{guidance.eyebrow}</Eyebrow>
            <h2 id="guidance-title" className="type-h1">
              {guidance.title}
            </h2>
            <p className="type-body-lg text-muted">{guidance.description}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <CheckList items={guidance.items} className="type-body-lg gap-4 text-foreground" />
          </div>
        </div>
      </Section>

      {channels.length > 0 ? (
        <Section labelledBy="details-title">
          <SectionHeader eyebrow={details.eyebrow} title={details.title} titleId="details-title" />
          <div className="max-w-xl rounded-lg border border-border bg-card p-6 md:p-8">
            <ContactChannelList channels={channels} showLabels className="gap-5" />
          </div>
        </Section>
      ) : null}

      <CtaSection {...cta} />
    </>
  );
}
