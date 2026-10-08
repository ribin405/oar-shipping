import type { ContactDetails } from "@/types/contact";

/**
 * The single source for public contact details, read by the Contact page and
 * the footer (and, later, quote confirmations and structured data).
 *
 * Intentionally empty: Oar has not yet supplied verified contact channels.
 * Add a field only when it is confirmed; the site renders exactly the fields
 * that are set and omits the rest. Do not add placeholders or guesses.
 */
export const contactDetails: ContactDetails = {};
