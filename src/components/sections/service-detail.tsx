import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaFrame } from "@/components/media/media-frame";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CoverageSection } from "@/components/sections/coverage-section";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { OfferGrid } from "@/components/sections/offer-grid";
import { ServiceProcess } from "@/components/sections/service-process";
import { PortCallSection } from "@/components/sections/port-call-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowLink } from "@/components/ui/arrow-link";
import { routes } from "@/config/routes";
import { servicePageContent as copy } from "@/content/services/shared";
import { buildServiceNode } from "@/lib/seo/structured-data";
import type { Service } from "@/types/service";

/** The one template behind every /services/[slug] page. All content comes from the service record. */
export function ServiceDetail({ service }: { service: Service }) {
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
        cta={service.heroAction ?? copy.cta.primaryCta}
        compactTitle
        visual={
          service.image ? (
            <MediaFrame
              src={service.image.src}
              alt={service.image.alt}
              position={service.image.position}
              ratio="standard"
              sizes="(min-width: 1440px) 511px, (min-width: 1280px) 39vw, (min-width: 1024px) 38vw, 100vw"
              preload
              className="media-wash rounded-lg"
            />
          ) : undefined
        }
      />

      <Section labelledBy="offer-title">
        <SectionHeader eyebrow={service.offer.eyebrow} title={service.offer.title} titleId="offer-title" />
        <OfferGrid groups={service.offer.groups} />
      </Section>

      {service.showCoordination ? <PortCallSection /> : null}

      <Section spacing="compact" labelledBy="process-title">
        <SectionHeader eyebrow={copy.process.eyebrow} title={copy.process.title} titleId="process-title" />
        <ServiceProcess steps={service.process} />
      </Section>

      <CoverageSection id="coverage-title" {...copy.coverage} />

      <Section spacing="compact" labelledBy="related-title">
        <SectionHeader
          eyebrow={copy.related.eyebrow}
          title={copy.related.title}
          titleId="related-title"
          action={<ArrowLink href={copy.related.action.href}>{copy.related.action.label}</ArrowLink>}
        />
        <CapabilityGrid linkTo="detail" linkLabel="View services" slugs={service.related} />
      </Section>

      <CtaSection {...copy.cta} />
    </>
  );
}
