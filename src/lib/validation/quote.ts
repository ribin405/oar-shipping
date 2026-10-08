import { z } from "zod";

import { serviceSlugs } from "@/types/service";
import type { QuoteFormData } from "@/types/quote";

const requiredText = (emptyMessage: string, max: number) =>
  z.string().trim().min(1, emptyMessage).max(max, `Please keep this to ${max} characters or fewer.`);

const optionalText = (max: number) => z.string().trim().max(max, `Please keep this to ${max} characters or fewer.`).optional();

/**
 * Validation for the quote request. Deliberately permissive: no country-specific
 * phone format, no port or vessel database checks, no character restrictions on
 * names. The service must be one of the canonical service slugs.
 */
export const quoteSchema = z.object({
  name: requiredText("Please enter your name.", 120),
  company: requiredText("Please enter your company name.", 160),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Please keep this to 254 characters or fewer.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number.")
    .max(40, "Please keep this to 40 characters or fewer.")
    .refine((value) => value.replace(/\D/g, "").length >= 5, "Please enter a valid phone number."),
  country: requiredText("Please enter your country.", 80),
  service: z.enum(serviceSlugs, { errorMap: () => ({ message: "Please select a service." }) }),
  cargoType: requiredText("Please describe the cargo type.", 120),
  pickupLocation: requiredText("Please enter the pickup or supplier location.", 200),
  deliveryPort: requiredText("Please enter the delivery port.", 200),
  vesselName: requiredText("Please enter the vessel name.", 120),
  eta: optionalText(40),
  cargoDetails: optionalText(2000),
  requiredDeliveryDate: optionalText(20),
  additionalRequirements: optionalText(2000),
}) satisfies z.ZodType<QuoteFormData>;
