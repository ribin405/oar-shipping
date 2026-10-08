import type { LucideIcon } from "lucide-react";

import type { ContentImage, Faq } from "@/types/content";
import type { AudienceSlug } from "@/types/industry";

/** The six approved services. The union is derived from this list, so adding a service here makes the compiler (and content validation) require its capability and detail content. */
export const serviceSlugs = [
  "port-logistics",
  "vessel-delivery",
  "customs-clearance",
  "warehousing",
  "cargo-transportation",
  "port-coordination",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Short entry point (title, icon, summary) used by the homepage, strip, footer and listings. */
export interface ServiceCapability {
  slug: ServiceSlug;
  title: string;
  icon: LucideIcon;
  description: string;
  /** Optional cover image for the service card and the service page. Leave unset until an approved, brand-free asset exists. */
  image?: ContentImage;
}

/** Controlled vocabulary of activities a service may coordinate; labels and icons live in one place. */
export type CoordinationKind =
  | "supplier"
  | "cargo"
  | "documentation"
  | "customs"
  | "transport"
  | "storage"
  | "port"
  | "delivery";

/** Step labels of the shared "how it works" process ("01" to "05"). */
export type ProcessStepLabel = "01" | "02" | "03" | "04" | "05";

/** Everything the service detail template renders beyond the capability record. */
export interface ServiceDetailContent {
  /** Page title without the site suffix; describes the service in search language. */
  metaTitle: string;
  metaDescription: string;
  hero: { title: string; description: string };
  problem: { title: string; paragraphs: readonly string[] };
  role: { title: string; paragraphs: readonly string[] };
  /** Activities this service coordinates; `description` is service-specific. */
  coordinates: readonly { kind: CoordinationKind; description: string }[];
  /** Process steps this service mainly involves, highlighted in the shared process. */
  processFocus: readonly ProcessStepLabel[];
  processNote: string;
  /** Information that may help Oar assess the requirement. Not a checklist every request must satisfy. */
  requirements: readonly string[];
  audiences: readonly AudienceSlug[];
  related: readonly ServiceSlug[];
  faq: readonly Faq[];
  /** Optional approved image. Leave unset until an approved, brand-free asset exists. */
  image?: ContentImage;
}

/** A complete service: capability record plus detail content. */
export interface Service extends ServiceCapability, ServiceDetailContent {}
