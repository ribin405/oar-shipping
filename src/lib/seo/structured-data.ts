import { heroContent } from "@/content/home/hero";
import { routes } from "@/config/routes";
import { absoluteUrl } from "@/lib/seo/url";
import { siteConfig } from "@/lib/site-config";
import type { Service } from "@/types/service";

/**
 * Schema.org JSON-LD builders.
 *
 * Only values that the site visibly states and that Oar has approved are
 * emitted. Deliberately absent until Oar verifies them: legalName, telephone,
 * email, address, contactPoint, sameAs, areaServed, foundingDate, offers,
 * ratings and reviews. Every builder returns undefined when no production
 * origin is configured, so unconfigured builds emit no structured data.
 */

export type JsonLdNode = Readonly<Record<string, unknown>>;

const LOGO_PATH = "/images/brand/oar-logo.png";

/** Stable `@id` of the one Organization entity (declared on the homepage). */
export const organizationId = (): string | undefined => {
  const origin = absoluteUrl(routes.home);
  return origin ? `${origin}/#organization` : undefined;
};

const websiteId = (): string | undefined => {
  const origin = absoluteUrl(routes.home);
  return origin ? `${origin}/#website` : undefined;
};

/** Stable `@id` of a service entity, anchored to its canonical page URL. */
const serviceId = (slug: string): string | undefined => {
  const url = absoluteUrl(routes.service(slug));
  return url ? `${url}#service` : undefined;
};

/** Organization and WebSite for the homepage, as one connected graph. */
export function buildSiteGraph(): JsonLdNode | undefined {
  const origin = absoluteUrl(routes.home);
  const orgId = organizationId();
  const siteId = websiteId();
  const logo = absoluteUrl(LOGO_PATH);
  if (!origin || !orgId || !siteId || !logo) return undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: origin,
        description: heroContent.description,
        logo,
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: origin,
        name: siteConfig.name,
        inLanguage: siteConfig.defaultLocale,
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** Service entity for a service page, derived from the canonical service content. */
export function buildServiceNode(service: Pick<Service, "slug" | "title" | "hero">): JsonLdNode | undefined {
  const id = serviceId(service.slug);
  const url = absoluteUrl(routes.service(service.slug));
  const orgId = organizationId();
  if (!id || !url || !orgId) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id,
    name: service.title,
    description: service.hero.description,
    url,
    provider: { "@id": orgId },
  };
}

export interface BreadcrumbItem {
  label: string;
  /** Root-relative path of the crumb's page. */
  path: string;
}

/** BreadcrumbList mirroring the visible breadcrumb trail. */
export function buildBreadcrumbList(items: readonly BreadcrumbItem[]): JsonLdNode | undefined {
  const entries = items.map(({ label, path }, index) => {
    const item = absoluteUrl(path);
    return item ? { "@type": "ListItem", position: index + 1, name: label, item } : undefined;
  });
  if (entries.length === 0 || entries.some((entry) => entry === undefined)) return undefined;

  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: entries };
}

/** JSON for embedding in a script tag: `<` and line separators are escaped so content can never close the tag. */
export function serializeJsonLd(node: JsonLdNode): string {
  return JSON.stringify(node)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
