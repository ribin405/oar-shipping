import type { LucideIcon } from "lucide-react";

import type { ContentEntry, ContentImage } from "@/types/content";

export type Industry = ContentEntry;

/** The five approved audiences. The union is derived from this list. */
export const audienceSlugs = [
  "ship-management",
  "marine-suppliers",
  "shipping-agents",
  "freight-forwarders",
  "marine-offshore",
] as const;

export type AudienceSlug = (typeof audienceSlugs)[number];

/** A target audience. `summary` is the short homepage line; `pageDescription` is the Industries page line. */
export interface IndustryAudience extends Industry {
  slug: AudienceSlug;
  icon: LucideIcon;
  pageDescription: string;
  image?: ContentImage;
}
