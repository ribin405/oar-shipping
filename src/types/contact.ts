import type { coveragePorts } from "@/content/ports/coverage";

/** One of Oar's offices: the group company that runs it and where it is. */
export interface Office {
  role: "Head Office" | "Operational Office";
  /** Legal name of the group company, as it should appear publicly. */
  company: string;
  /** Town or city. */
  locality: string;
  /** The port this office sits at; places it on the offices map. */
  port: (typeof coveragePorts)[number];
}

/**
 * Verified Oar contact details. Every field is optional: a field is set only
 * when Oar has supplied and confirmed it, and anything absent is simply not
 * rendered. Never infer a value (for example an email from the domain, or an
 * office from the markets Oar serves).
 */
export interface ContactDetails {
  /** The head office and the operational office. */
  offices?: readonly Office[];
  email?: string;
  /** International format, e.g. as printed on Oar materials. */
  phone?: string;
  /** International number; used to build a wa.me link. */
  whatsapp?: string;
  /** Office address as it should appear publicly. */
  address?: string;
  /** Role-specific mailboxes, set only when Oar has confirmed they are live. */
  departments?: { operations?: string; pda?: string; businessDevelopment?: string };
  /** Operating hours as they should appear publicly. */
  hours?: string;
  /** Verified public profiles. Add only URLs Oar has confirmed; never infer them from the company name. */
  social?: readonly { label: string; url: string }[];
}
