/**
 * Verified Oar contact details. Every field is optional: a field is set only
 * when Oar has supplied and confirmed it, and anything absent is simply not
 * rendered. Never infer a value (for example an email from the domain, or an
 * office from the markets Oar serves).
 */
export interface ContactDetails {
  email?: string;
  /** International format, e.g. as printed on Oar materials. */
  phone?: string;
  /** International number; used to build a wa.me link. */
  whatsapp?: string;
  /** Office address as it should appear publicly. */
  address?: string;
  /** Operating hours as they should appear publicly. */
  hours?: string;
  /** Verified public profiles. Add only URLs Oar has confirmed; never infer them from the company name. */
  social?: readonly { label: string; url: string }[];
}
