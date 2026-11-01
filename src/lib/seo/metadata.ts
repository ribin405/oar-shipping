import type { Metadata } from "next";

import { assertSeoText, renderedTitle } from "@/lib/seo/limits";
import { siteConfig } from "@/lib/site-config";

/** Site-wide defaults. Pages refine these through `buildPageMetadata`. */
const images = siteConfig.ogImage
  ? [{ url: siteConfig.ogImage.path, width: siteConfig.ogImage.width, height: siteConfig.ogImage.height, alt: siteConfig.ogImage.alt }]
  : undefined;
const twitterCard = images ? "summary_large_image" : "summary";
/** Open Graph locale of the audience: English as read in the UAE. */
const OPEN_GRAPH_LOCALE = "en_AE";

export const rootMetadata: Metadata = {
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: OPEN_GRAPH_LOCALE,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images,
  },
  twitter: {
    card: twitterCard,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images,
  },
  robots: siteConfig.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

interface PageMetadataInput {
  /** Omit on the homepage to use the default title. Use `{ absolute }` to skip the site title template. */
  title?: string | { absolute: string };
  description?: string;
  /** Root-relative path, used for the canonical URL and Open Graph URL. */
  path: string;
  /** Keeps a page out of search results (it stays reachable). */
  noindex?: boolean;
}

/**
 * Builds per-page metadata. Next.js replaces nested `openGraph` and `twitter`
 * objects instead of merging them, so the shared fields are repeated here.
 */
export function buildPageMetadata({ title, description, path, noindex = false }: PageMetadataInput): Metadata {
  const resolvedDescription = description ?? siteConfig.description;
  const socialTitle = title ? renderedTitle(title, siteConfig.name) : siteConfig.defaultTitle;
  assertSeoText(`Page "${path}"`, { title: socialTitle, description: resolvedDescription });

  return {
    ...(title ? { title } : {}),
    description: resolvedDescription,
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    ...(siteConfig.url ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      locale: OPEN_GRAPH_LOCALE,
      siteName: siteConfig.name,
      title: socialTitle,
      description: resolvedDescription,
      ...(siteConfig.url ? { url: path } : {}),
      images,
    },
    twitter: {
      card: twitterCard,
      title: socialTitle,
      description: resolvedDescription,
      images,
    },
  };
}
