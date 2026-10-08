import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsightDetail } from "@/components/sections/insight-detail";
import { routes } from "@/config/routes";
import { getInsight, getRelatedInsights, insights } from "@/content/insights";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

/** Only published entries in the insight collection have pages; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  return buildPageMetadata({ title: insight.title, description: insight.excerpt, path: routes.insight(insight.slug) });
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  return <InsightDetail insight={insight} relatedInsights={getRelatedInsights(insight)} />;
}
