import type { MetadataRoute } from "next";

import { routes } from "@/config/routes";
import { insights } from "@/content/insights";
import { ports } from "@/content/ports";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo/url";
import { siteConfig } from "@/lib/site-config";

/**
 * Lists only pages that exist. Service, port and insight URLs are derived from
 * their collections, so approved content appears here automatically.
 */
const publishedPaths: readonly string[] = [
  routes.home,
  routes.about,
  routes.whyOar,
  routes.industries,
  routes.services,
  ...services.map(({ slug }) => routes.service(slug)),
  routes.ports,
  ...ports.map(({ slug }) => routes.port(slug)),
  routes.insights,
  ...insights.map(({ slug }) => routes.insight(slug)),
  routes.contact,
  routes.requestQuote,
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable) return [];

  return publishedPaths.flatMap((path) => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
