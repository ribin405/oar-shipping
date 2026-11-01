/**
 * Length rules for search-result text. Titles and descriptions longer than
 * these are truncated by search engines and social cards, and very short ones
 * waste the snippet, so they fail the build instead of shipping.
 */
export const SEO_LIMITS = {
  /** Full rendered title, including the " | Oar Shipping" suffix. */
  titleMax: 70,
  descriptionMin: 70,
  descriptionMax: 165,
} as const;

/** The title as search engines will show it: the template suffix is added to plain string titles. */
export function renderedTitle(title: string | { absolute: string }, siteName: string): string {
  return typeof title === "string" ? `${title} | ${siteName}` : title.absolute;
}

/** Throws a build error naming the page when the text is outside the limits. */
export function assertSeoText(where: string, { title, description }: { title?: string; description?: string }): void {
  if (title !== undefined && title.length > SEO_LIMITS.titleMax) {
    throw new Error(`SEO error: ${where} title is ${title.length} characters (max ${SEO_LIMITS.titleMax}): "${title}"`);
  }
  if (description !== undefined) {
    const { length } = description;
    if (length < SEO_LIMITS.descriptionMin || length > SEO_LIMITS.descriptionMax) {
      throw new Error(
        `SEO error: ${where} description is ${length} characters (needs ${SEO_LIMITS.descriptionMin}-${SEO_LIMITS.descriptionMax}): "${description}"`,
      );
    }
  }
}
