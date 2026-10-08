import { InsightCard } from "@/components/cards/insight-card";
import { MediaFrame } from "@/components/media/media-frame";
import { routes } from "@/config/routes";
import { getReadingTimeMinutes } from "@/content/insights";
import { insightKindLabels } from "@/content/insights/shared";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Insight } from "@/types/insight";

interface InsightGridProps {
  insights: readonly Insight[];
  linkLabel: string;
  className?: string;
}

/** One InsightCard per insight. Metadata that does not exist is omitted, never shown as a placeholder. */
export function InsightGrid({ insights, linkLabel, className }: InsightGridProps) {
  return (
    <ul className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {insights.map((insight) => {
        const minutes = getReadingTimeMinutes(insight);
        const meta = [
          insight.category,
          insight.publishedAt ? formatDate(insight.publishedAt) : undefined,
          minutes ? `${minutes} min read` : undefined,
        ]
          .filter(Boolean)
          .join(" · ");

        return (
          <li key={insight.slug}>
            <InsightCard
              title={insight.title}
              excerpt={insight.excerpt}
              href={routes.insight(insight.slug)}
              linkLabel={linkLabel}
              category={insightKindLabels[insight.kind]}
              meta={meta || undefined}
              media={
                insight.image ? (
                  <MediaFrame src={insight.image.src} alt={insight.image.alt} ratio="landscape" />
                ) : undefined
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
