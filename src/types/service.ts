import type { LucideIcon } from "lucide-react";

import type { ContentImage } from "@/types/content";

/** The four approved service divisions. The union is derived from this list, so adding one here makes the compiler (and content validation) require its capability and detail content. */
export const serviceSlugs = ["ship-chandling", "customs-logistics", "marine-services", "pda-review"] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Short entry point (title, icon, summary) used by the homepage, hero index, footer and listings. */
export interface ServiceCapability {
  slug: ServiceSlug;
  title: string;
  icon: LucideIcon;
  description: string;
  /** Cover image for the service card and the service page. Leave unset until an approved, brand-free asset exists. */
  image?: ContentImage;
}

/** One card of the "What we offer" grid: a title and either a short list or a single description. */
export interface OfferGroup {
  title: string;
  items?: readonly string[];
  description?: string;
}

/** Everything the service detail template renders beyond the capability record. */
export interface ServiceDetailContent {
  /** Page title without the site suffix; describes the service in search language. */
  metaTitle: string;
  metaDescription: string;
  hero: { title: string; description: string };
  /** Contact path for the hero button; defaults to the quote page. */
  heroAction?: { label: string; href: string };
  offer: { eyebrow: string; title: string; groups: readonly OfferGroup[] };
  /** Show the shared port-call timeline (pre-arrival to departure) under the offer. */
  showCoordination?: boolean;
  /** The steps of "Our process", in order. */
  process: readonly string[];
  related: readonly ServiceSlug[];
}

/** A complete service: capability record plus detail content. */
export interface Service extends ServiceCapability, ServiceDetailContent {}
