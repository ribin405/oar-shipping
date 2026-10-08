import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaFrame } from "@/components/media/media-frame";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { Accordion } from "@/components/ui/accordion";
import { ArrowLink } from "@/components/ui/arrow-link";
import { CheckList } from "@/components/ui/check-list";
import { routes } from "@/config/routes";
import { portPageContent as copy } from "@/content/ports/shared";
import type { Port } from "@/types/port";

/**
 * The one template behind every /ports/[slug] page. It renders only what the
 * verified port entry provides: optional sections are skipped when their data
 * is absent. General facts about the port and verified facts about Oar's role
 * are kept in separate sections.
 */
export function PortDetail({ port }: { port: Port }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: routes.home },
          { label: "Ports & Locations", href: routes.ports },
          { label: port.name },
        ]}
        path={routes.port(port.slug)}
      />
      <InnerPageHero
        eyebrow={copy.heroEyebrow}
        title={port.name}
        description={port.summary}
        cta={copy.cta.primaryCta}
        visual={
          port.image ? (
            <MediaFrame src={port.image.src} alt={port.image.alt} ratio="standard" className="rounded-lg" />
          ) : undefined
        }
      />

      <NarrativeSection
        id="overview"
        eyebrow={copy.overviewEyebrow}
        title={`About ${port.name}`}
        paragraphs={port.description}
      />

      {port.oarRole?.length ? (
        <NarrativeSection
          id="oar-role"
          surface="dark"
          eyebrow={copy.oarRole.eyebrow}
          title={`Oar and ${port.name}`}
          paragraphs={port.oarRole}
        />
      ) : null}

      {port.services?.length ? (
        <Section surface="muted" labelledBy="port-services-title">
          <SectionHeader
            eyebrow={copy.services.eyebrow}
            title={copy.services.title}
            titleId="port-services-title"
            action={<ArrowLink href={copy.services.action.href}>{copy.services.action.label}</ArrowLink>}
          />
          <CapabilityGrid linkTo="detail" linkLabel="Explore service" slugs={port.services} />
        </Section>
      ) : null}

      {port.operationalNotes?.length ? (
        <Section labelledBy="considerations-title">
          <SectionHeader eyebrow={copy.considerations.eyebrow} title={copy.considerations.title} titleId="considerations-title" />
          <div className="max-w-3xl rounded-lg border border-border bg-card p-6 md:p-8">
            <CheckList items={port.operationalNotes} className="type-body-lg gap-4 text-foreground" />
          </div>
        </Section>
      ) : null}

      {port.audiences?.length ? (
        <Section surface="muted" labelledBy="port-industries-title">
          <SectionHeader
            eyebrow={copy.industries.eyebrow}
            title={copy.industries.title}
            titleId="port-industries-title"
            action={<ArrowLink href={copy.industries.action.href}>{copy.industries.action.label}</ArrowLink>}
          />
          <IndustryGrid variant="detail" slugs={port.audiences} />
        </Section>
      ) : null}

      {port.faq?.length ? (
        <Section labelledBy="port-faq-title">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow={copy.faq.eyebrow} title={copy.faq.title} titleId="port-faq-title" />
            <Accordion items={port.faq} />
          </div>
        </Section>
      ) : null}

      <CtaSection {...copy.cta} />
    </>
  );
}
