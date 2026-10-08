import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { InsightGrid } from "@/components/sections/insight-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Badge } from "@/components/ui/badge";
import { insightsContent } from "@/content/home/insights";
import { getSortedInsights } from "@/content/insights";

const TITLE_ID = "insights-title";

export function InsightsSection() {
  const { eyebrow, title, description, topics, topicsLabel, viewAll, cardLinkLabel } = insightsContent;
  const insights = getSortedInsights().slice(0, 3);

  return (
    <Section labelledBy={TITLE_ID}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleId={TITLE_ID}
        action={<ArrowLink href={viewAll.href}>{viewAll.label}</ArrowLink>}
      />
      {insights.length > 0 ? (
        <InsightGrid insights={insights} linkLabel={cardLinkLabel} />
      ) : (
        <div className="flex flex-col gap-4 border-t border-border pt-6">
          <p className="type-label text-muted">{topicsLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <li key={topic}>
                <Badge>{topic}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
