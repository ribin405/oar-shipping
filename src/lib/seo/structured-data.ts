import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import type { Metadata } from "next";

import { heroContent } from "@/content/home/hero";
import { serviceCapabilities } from "@/content/services/capabilities";
import { absoluteUrl } from "@/lib/seo/url";
import { siteConfig } from "@/lib/site-config";
import type { Service } from "@/types/service";

/**
 * Schema.org JSON-LD builders.
 *
 * Only values that the site visibly states and that Oar has approved are
 * emitted: the name, logo, services, the Fujairah base and the UAE service
 * area (all in the client's content) and the contact mailboxes confirmed in
 * `config/contact.ts`. Deliberately absent until Oar verifies them: legalName,
 * street address, telephone, sameAs profiles, foundingDate, prices, ratings and
 * reviews. Every builder returns undefined when no production origin is
 * configured, so unconfigured builds emit no structured data.
 *
 * Entities are linked by stable `@id`s (organization, website, one per page,
 * one per service) so search and generative engines read one connected graph
 * instead of loose fragments.
 */

export type JsonLdNode = Readonly<Record<string, unknown>>;

const LOGO_PATH = "/images/brand/oar-logo.png";
const COUNTRY = { "@type": "Country", name: "United Arab Emirates" } as const;

/** Stable `@id` of the one Organization entity (declared on the homepage). */
export const organizationId = (): string | undefined => {
  const origin = absoluteUrl(routes.home);
  return origin ? `${origin}/#organization` : undefined;
};

const websiteId = (): string | undefined => {
  const origin = absoluteUrl(routes.home);
  return origin ? `${origin}/#website` : undefined;
};

const pageId = (path: string): string | undefined => {
  const url = absoluteUrl(path);
  if (!url) return undefined;
  return path === routes.home ? `${url}/#webpage` : `${url}#webpage`;
};

/** Stable `@id` of a service entity, anchored to its canonical page URL. */
const serviceId = (slug: string): string | undefined => {
  const url = absoluteUrl(routes.service(slug));
  return url ? `${url}#service` : undefined;
};

/** The one confirmed mailbox as the organization's ContactPoint. */
function contactPoints(): JsonLdNode[] {
  const { email } = contactDetails;
  return email
    ? [{ "@type": "ContactPoint", contactType: "customer service", email, areaServed: "AE", availableLanguage: "English" }]
    : [];
}

/** Organization, WebSite and the homepage WebPage as one connected graph. */
export function buildSiteGraph(): JsonLdNode | undefined {
  const origin = absoluteUrl(routes.home);
  const orgId = organizationId();
  const siteId = websiteId();
  const homeId = pageId(routes.home);
  const logo = absoluteUrl(LOGO_PATH);
  if (!origin || !orgId || !siteId || !homeId || !logo) return undefined;

  const offers = serviceCapabilities.flatMap(({ slug }) => {
    const id = serviceId(slug);
    return id ? [{ "@type": "Offer", itemOffered: { "@id": id } }] : [];
  });

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
        image: siteConfig.ogImage ? absoluteUrl(siteConfig.ogImage.path) : undefined,
        address: { "@type": "PostalAddress", addressLocality: "Fujairah", addressCountry: "AE" },
        location: (contactDetails.offices ?? []).map(({ role, company, locality }) => ({
          "@type": "Place",
          name: `${role}: ${company}`,
          address: { "@type": "PostalAddress", addressLocality: locality, addressCountry: "AE" },
        })),
        areaServed: COUNTRY,
        knowsAbout: serviceCapabilities.map(({ title }) => title),
        contactPoint: contactPoints(),
        sameAs: (contactDetails.social ?? []).map(({ url }) => url),
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Marine services", itemListElement: offers },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: origin,
        name: siteConfig.name,
        inLanguage: siteConfig.defaultLocale,
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": homeId,
        url: origin,
        name: siteConfig.defaultTitle,
        description: heroContent.description,
        inLanguage: siteConfig.defaultLocale,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
      },
    ],
  };
}

type PageKind = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

interface WebPageInput {
  kind: PageKind;
  /** Root-relative path of the page. */
  path: string;
  name: string;
  description: string;
  /** Items listed on a collection page (their canonical paths and names). */
  items?: readonly { name: string; path: string }[];
}

/** `buildWebPage` fed from a page's own `metadata`, so the name and description can never drift from the meta tags. */
export function buildPageNode(
  kind: PageKind,
  path: string,
  metadata: Metadata,
  items?: WebPageInput["items"],
): JsonLdNode | undefined {
  const title = metadata.openGraph?.title;
  return buildWebPage({
    kind,
    path,
    name: typeof title === "string" ? title : siteConfig.defaultTitle,
    description: metadata.description ?? siteConfig.description,
    items,
  });
}

/** A page entity tied to the site and organization, optionally with the list of items it presents. */
export function buildWebPage({ kind, path, name, description, items }: WebPageInput): JsonLdNode | undefined {
  const id = pageId(path);
  const url = absoluteUrl(path);
  const siteId = websiteId();
  const orgId = organizationId();
  if (!id || !url || !siteId || !orgId) return undefined;

  const listed = items?.flatMap((item, index) => {
    const itemUrl = absoluteUrl(item.path);
    return itemUrl ? [{ "@type": "ListItem", position: index + 1, name: item.name, url: itemUrl }] : [];
  });

  return {
    "@context": "https://schema.org",
    "@type": kind,
    "@id": id,
    url,
    name,
    description,
    inLanguage: siteConfig.defaultLocale,
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    ...(listed?.length ? { mainEntity: { "@type": "ItemList", itemListElement: listed } } : {}),
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
    serviceType: service.title,
    description: service.hero.description,
    url,
    areaServed: COUNTRY,
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
