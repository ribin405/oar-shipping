import { serviceSlugs, type ServiceSlug } from "@/types/service";

/** The service choices on the quote form: the four divisions plus "not sure yet", which is still a lead. */
export const quoteServiceValues = [...serviceSlugs, "not-sure"] as const;
export type QuoteService = ServiceSlug | "not-sure";

/**
 * The business data of a quote request, exactly as it is submitted. UI state
 * (submitting, success, field focus) lives in the form component, never here.
 * Optional fields are empty when the visitor leaves them blank. At least one of
 * `email` and `phone` is required, so every request can be answered.
 */
export interface QuoteFormData {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  /** Canonical service slug (or "not-sure"), not the display label. */
  service?: QuoteService | "";
  details?: string;
  vesselName?: string;
  /** Expected vessel arrival as a date value (YYYY-MM-DD). */
  eta?: string;
}

/** Validation messages keyed by field, safe to show to the visitor. */
export type QuoteFieldErrors = Partial<Record<keyof QuoteFormData, string>>;

/**
 * What the submission boundary returns. Failure codes are deliberately
 * coarse: they never carry provider errors, configuration details or
 * recipient information.
 */
export type QuoteSubmissionResult =
  | { success: true }
  | { success: false; code: "VALIDATION_ERROR"; fieldErrors: QuoteFieldErrors }
  | { success: false; code: "NOT_CONFIGURED" | "DELIVERY_FAILED" | "INTERNAL_ERROR" };
