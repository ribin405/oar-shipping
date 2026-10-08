import type { ContentImage } from "@/types/content";
import type { AudienceSlug } from "@/types/industry";
import type { ServiceSlug } from "@/types/service";

export type InsightKind = "article" | "case-study" | "guide" | "company-update";

/** Metadata and filtering labels only; categories are not routes. */
export type InsightCategory =
  | "Marine Logistics"
  | "Port Operations"
  | "Vessel Support"
  | "Customs & Documentation"
  | "Supply Chain"
  | "Company Updates";

/** Structured body content. Rendered as semantic HTML; raw HTML is never accepted. */
export type InsightBlock =
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[]; ordered?: boolean }
  | { type: "quote"; text: string; attribution?: string };

/**
 * An approved, published Oar insight. Only `slug`, `title`, `excerpt` and
 * `kind` are required: omit anything that is not verified (author, dates,
 * image, related items) rather than filling it in. Reading time is derived
 * from `content`, never entered by hand.
 */
export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  kind: InsightKind;
  category?: InsightCategory;
  /** ISO 8601 date (YYYY-MM-DD). Only set for an approved, real publication date. */
  publishedAt?: string;
  updatedAt?: string;
  /** Only set for an author Oar has approved to be named. */
  author?: string;
  featured?: boolean;
  image?: ContentImage;
  content?: readonly InsightBlock[];
  relatedServices?: readonly ServiceSlug[];
  relatedIndustries?: readonly AudienceSlug[];
  /** Slugs of other published insights. Unknown or self references are ignored. */
  relatedInsights?: readonly string[];
}
