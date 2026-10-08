import { validateInsights } from "@/lib/content-validation";
import type { Insight, InsightBlock } from "@/types/insight";

/**
 * The canonical collection of published Oar insights. Intentionally empty:
 * Oar has not yet approved any articles. Adding one entry here gives it a
 * /insights/[slug] page, a sitemap entry and a card on the overview and the
 * homepage. Do not add placeholder articles, authors or dates.
 */
export const insights: readonly Insight[] = [];

validateInsights(insights);

export function getInsight(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

/** Newest first; insights without a date follow, in the order they were authored. */
export function getSortedInsights(): readonly Insight[] {
  return [...insights].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function getFeaturedInsight(): Insight | undefined {
  return getSortedInsights().find((insight) => insight.featured);
}

/** Resolves `relatedInsights` to published entries, dropping unknown slugs and self references. */
export function getRelatedInsights(insight: Insight): readonly Insight[] {
  return (insight.relatedInsights ?? [])
    .filter((slug) => slug !== insight.slug)
    .map(getInsight)
    .filter((related): related is Insight => related !== undefined);
}

const WORDS_PER_MINUTE = 200;

function blockText(block: InsightBlock): string {
  return block.type === "list" ? block.items.join(" ") : block.text;
}

/** Whole minutes to read the body, or undefined when there is no body to measure. */
export function getReadingTimeMinutes(insight: Insight): number | undefined {
  if (!insight.content?.length) return undefined;
  const words = insight.content.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
