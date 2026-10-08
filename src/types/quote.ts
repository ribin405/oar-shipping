import type { ServiceSlug } from "@/types/service";

/**
 * The business data of a quote request, exactly as it is submitted. UI state
 * (submitting, success, field focus) lives in the form component, never here.
 * Optional fields are omitted or empty when the visitor leaves them blank.
 */
export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  /** Canonical service slug, not the display label. */
  service: ServiceSlug;
  cargoType: string;
  pickupLocation: string;
  deliveryPort: string;
  vesselName: string;
  /** Expected vessel arrival, as a datetime-local value (no time zone conversion). */
  eta?: string;
  cargoDetails?: string;
  /** Required delivery date as a date value (YYYY-MM-DD). */
  requiredDeliveryDate?: string;
  additionalRequirements?: string;
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
