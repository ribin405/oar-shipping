import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaFrame } from "@/components/media/media-frame";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ArticleBody } from "@/components/sections/article-body";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { InsightGrid } from "@/components/sections/insight-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { routes } from "@/config/routes";
import { getReadingTimeMinutes } from "@/content/insights";
import { insightKindLabels, insightPageContent as copy } from "@/content/insights/shared";
import { formatDate } from "@/lib/format";
import type { Insight } from "@/types/insight";

interface InsightDetailProps {
  insight: Insight;
  /** Already-resolved related insights (see `getRelatedInsights`). */
  relatedInsights?: readonly Insight[];
}

/**
 * The one template behind every /insights/[slug] page. Sections render only
 * when the insight provides the data for them; no metadata is ever invented.
 */
export function InsightDetail({ insight, relatedInsights = [] }: InsightDetailProps) {
  const minutes = getReadingTimeMinutes(insight);
  const meta = [
    insightKindLabels[insight.kind],
    insight.publishedAt ? (
      <time key="date" dateTime={insight.publishedAt}>
        {formatDate(insight.publishedAt)}
      </time>
    ) : null,
    minutes ? `${minutes} min read` : null,
    insight.author ? `By ${insight.author}` : null,
  ].filter(Boolean);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: routes.home },
          { label: "Insights", href: routes.insights },
          { label: insight.title },
        ]}
        path={routes.insight(insight.slug)}
      />
      <InnerPageHero
        eyebrow={insight.category ? `${copy.heroEyebrow} / ${insight.category}` : copy.heroEyebrow}
        title={insight.title}
        description={insight.excerpt}
        meta={
          <ul className="type-body flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
            {meta.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                {index > 0 ? <span aria-hidden="true">•</span> : null}
                {item}
              </li>
            ))}
          </ul>
        }
      />

      {insight.image || insight.content?.length ? (
        <Section spacing="compact" labelledBy="page-title">
          <article aria-labelledby="page-title" className="flex flex-col gap-10">
            {insight.image ? (
              <MediaFrame
                src={insight.image.src}
                alt={insight.image.alt}
                ratio="landscape"
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="max-w-4xl rounded-lg"
              />
            ) : null}
            {insight.content?.length ? <ArticleBody blocks={insight.content} /> : null}
          </article>
        </Section>
      ) : null}

      {insight.relatedServices?.length ? (
        <Section surface="muted" labelledBy="insight-services-title">
          <SectionHeader
            eyebrow={copy.services.eyebrow}
            title={copy.services.title}
            titleId="insight-services-title"
            action={<ArrowLink href={copy.services.action.href}>{copy.services.action.label}</ArrowLink>}
          />
          <CapabilityGrid linkTo="detail" linkLabel="Explore service" slugs={insight.relatedServices} />
        </Section>
      ) : null}

      {insight.relatedIndustries?.length ? (
        <Section labelledBy="insight-industries-title">
          <SectionHeader
            eyebrow={copy.industries.eyebrow}
            title={copy.industries.title}
            titleId="insight-industries-title"
            action={<ArrowLink href={copy.industries.action.href}>{copy.industries.action.label}</ArrowLink>}
          />
          <IndustryGrid variant="detail" slugs={insight.relatedIndustries} />
        </Section>
      ) : null}

      {relatedInsights.length > 0 ? (
        <Section surface="muted" labelledBy="related-insights-title">
          <SectionHeader eyebrow={copy.related.eyebrow} title={copy.related.title} titleId="related-insights-title" />
          <InsightGrid insights={relatedInsights} linkLabel={copy.cardLinkLabel} />
        </Section>
      ) : null}

      <CtaSection {...copy.cta} />
    </>
  );
}
