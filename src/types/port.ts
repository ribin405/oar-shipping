import type { ContentImage, Faq } from "@/types/content";
import type { AudienceSlug } from "@/types/industry";
import type { ServiceSlug } from "@/types/service";

/**
 * A verified Oar port or location entry. An entry exists only when Oar has
 * confirmed it; its presence in `content/ports` generates a page, a sitemap
 * entry and an overview card.
 *
 * Keep two kinds of statement apart:
 * - `description` and `operationalNotes` are general facts about the port.
 *   They never imply anything about Oar's presence or permissions there.
 * - `oarRole` states what Oar actually does at this port. Add it only when
 *   that is verified.
 */
export interface Port {
  slug: string;
  name: string;
  /** Emirate or area, e.g. as printed on the overview card. */
  region: string;
  /** One or two sentences: the card text, meta description and page lead. */
  summary: string;
  /** General paragraphs about the port. */
  description: readonly string[];
  /** Verified statements about Oar's role at this port. Omit when not verified. */
  oarRole?: readonly string[];
  /** Services verified as relevant at this port. Omit rather than listing all six. */
  services?: readonly ServiceSlug[];
  /** General considerations when planning a requirement at this port. */
  operationalNotes?: readonly string[];
  audiences?: readonly AudienceSlug[];
  image?: ContentImage;
  faq?: readonly Faq[];
}
