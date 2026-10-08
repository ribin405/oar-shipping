import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { InsightGrid } from "@/components/sections/insight-grid";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/config/routes";
import { getFeaturedInsight, getSortedInsights } from "@/content/insights";
import { insightsOverviewContent } from "@/content/insights/overview";
import { insightPageContent } from "@/content/insights/shared";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Marine Logistics & Port Execution Insights",
  description:
    "Perspectives on marine logistics, port execution and the coordination required to move cargo from supplier to vessel.",
  path: routes.insights,
});

export default function InsightsPage() {
  const { hero, intro, featured, all, perspective, cta } = insightsOverviewContent;
  const featuredInsight = getFeaturedInsight();
  const rest = getSortedInsights().filter((insight) => insight !== featuredInsight);
  const hasInsights = featuredInsight !== undefined || rest.length > 0;

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Insights" }]} path={routes.insights} />
      <InnerPageHero {...hero} />

      <NarrativeSection
        id="intro"
        eyebrow={intro.eyebrow}
        title={intro.title}
        paragraphs={intro.paragraphs}
        aside={
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 md:p-8">
            <p className="type-label text-muted">{intro.topicsLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {intro.topics.map((topic) => (
                <li key={topic}>
                  <Badge>{topic}</Badge>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {featuredInsight ? (
        <Section surface="muted" labelledBy="featured-title">
          <SectionHeader eyebrow={featured.eyebrow} title={featured.title} titleId="featured-title" />
          <InsightGrid
            insights={[featuredInsight]}
            linkLabel={insightPageContent.cardLinkLabel}
            className="md:grid-cols-1 lg:max-w-xl lg:grid-cols-1"
          />
        </Section>
      ) : null}

      {rest.length > 0 ? (
        <Section labelledBy="all-insights-title">
          <SectionHeader eyebrow={all.eyebrow} title={all.title} titleId="all-insights-title" />
          <InsightGrid insights={rest} linkLabel={insightPageContent.cardLinkLabel} />
        </Section>
      ) : null}

      {hasInsights ? null : (
        <Section surface="muted" labelledBy="perspective-title">
          <SectionHeader
            eyebrow={perspective.eyebrow}
            title={perspective.title}
            description={perspective.description}
            titleId="perspective-title"
            className="mb-8 md:mb-8"
          />
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {perspective.links.map((link) => (
              <li key={link.href}>
                <ArrowLink href={link.href}>{link.label}</ArrowLink>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaSection {...cta} />
    </>
  );
}
