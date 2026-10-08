import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaFrame } from "@/components/media/media-frame";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { JourneyDiagram } from "@/components/sections/journey-diagram";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { PrincipleGrid } from "@/components/sections/principle-grid";
import { ProcessSection } from "@/components/sections/process-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { ArrowLink } from "@/components/ui/arrow-link";
import { CheckList } from "@/components/ui/check-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/config/routes";
import { coordinationKinds } from "@/content/services/coordination";
import { servicePageContent as copy } from "@/content/services/shared";
import { buildServiceNode } from "@/lib/seo/structured-data";
import type { Service } from "@/types/service";

/** The one template behind every /services/[slug] page. All content comes from the service record. */
export function ServiceDetail({ service }: { service: Service }) {
  const coordinates = service.coordinates.map(({ kind, description }) => ({
    title: coordinationKinds[kind].label,
    icon: coordinationKinds[kind].icon,
    description,
  }));

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: routes.home },
          { label: "Services", href: routes.services },
          { label: service.title },
        ]}
        path={routes.service(service.slug)}
      />
      <JsonLd data={buildServiceNode(service)} />
      <InnerPageHero
        eyebrow={service.title}
        title={service.hero.title}
        description={service.hero.description}
        cta={copy.cta.primaryCta}
        visual={
          service.image ? (
            <MediaFrame src={service.image.src} alt={service.image.alt} position={service.image.position} ratio="standard" className="rounded-lg" />
          ) : undefined
        }
      />

      <NarrativeSection
        id="problem"
        eyebrow={copy.problemEyebrow}
        title={service.problem.title}
        paragraphs={service.problem.paragraphs}
      />

      <NarrativeSection
        id="role"
        surface="dark"
        eyebrow={copy.roleEyebrow}
        title={service.role.title}
        paragraphs={service.role.paragraphs}
        action={copy.roleLinks.whyOar}
        secondaryAction={copy.roleLinks.about}
        aside={<JourneyDiagram heading={copy.roleDiagramHeading} nodes={copy.roleNodes} />}
      />

      <Section surface="muted" labelledBy="coordinates-title">
        <SectionHeader eyebrow={copy.coordinates.eyebrow} title={copy.coordinates.title} titleId="coordinates-title" />
        <PrincipleGrid principles={coordinates} />
      </Section>

      <ProcessSection
        surface="light"
        eyebrow={copy.process.eyebrow}
        title={copy.process.title}
        description={service.processNote}
        highlight={service.processFocus}
      />

      <Section surface="dark" labelledBy="requirements-title">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex max-w-2xl flex-col items-start gap-4">
            <Eyebrow>{copy.requirements.eyebrow}</Eyebrow>
            <h2 id="requirements-title" className="type-h1">
              {copy.requirements.title}
            </h2>
            <p className="type-body-lg text-muted">{copy.requirements.note}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <CheckList items={service.requirements} className="type-body-lg gap-4 text-foreground" />
          </div>
        </div>
      </Section>

      <Section labelledBy="industries-title">
        <SectionHeader
          eyebrow={copy.industries.eyebrow}
          title={copy.industries.title}
          titleId="industries-title"
          action={<ArrowLink href={copy.industries.action.href}>{copy.industries.action.label}</ArrowLink>}
        />
        <IndustryGrid variant="detail" slugs={service.audiences} />
      </Section>

      <Section surface="muted" labelledBy="related-title">
        <SectionHeader
          eyebrow={copy.related.eyebrow}
          title={copy.related.title}
          titleId="related-title"
          action={<ArrowLink href={copy.related.action.href}>{copy.related.action.label}</ArrowLink>}
        />
        <CapabilityGrid linkTo="detail" linkLabel="Explore service" slugs={service.related} />
      </Section>

      <Section labelledBy="faq-title">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow={copy.faq.eyebrow} title={copy.faq.title} titleId="faq-title" />
          <Accordion items={service.faq} />
        </div>
      </Section>

      <CtaSection {...copy.cta} />
    </>
  );
}
