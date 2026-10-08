import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/url";
import { siteConfig } from "@/lib/site-config";

/** Crawling is allowed only on a configured, indexable production site. Otherwise everything is disallowed. */
export default function robots(): MetadataRoute.Robots {
  const sitemap = absoluteUrl("/sitemap.xml");

  if (!sitemap || !siteConfig.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return { rules: { userAgent: "*", allow: "/" }, sitemap };
}
