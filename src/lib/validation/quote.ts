import { z } from "zod";

import { quoteServiceValues, type QuoteFormData } from "@/types/quote";

const requiredText = (emptyMessage: string, max: number) =>
  z.string().trim().min(1, emptyMessage).max(max, `Please keep this to ${max} characters or fewer.`);

const optionalText = (max: number) => z.string().trim().max(max, `Please keep this to ${max} characters or fewer.`).optional();

const emailPattern = z.string().email();

/**
 * Validation for the quote request. Deliberately permissive: no country-specific
 * phone format, no vessel database checks, no character restrictions on names.
 * The service must be one of the canonical choices. Email and phone are each
 * optional, but one of them is required so the request can be answered.
 */
const quoteFields = z.object({
  name: requiredText("Please enter your name.", 120),
  company: requiredText("Please enter your company name.", 160),
  email: z
    .string()
    .trim()
    .max(254, "Please keep this to 254 characters or fewer.")
    .refine((value) => value === "" || emailPattern.safeParse(value).success, "Please enter a valid email address.")
    .optional(),
  phone: z
    .string()
    .trim()
    .max(40, "Please keep this to 40 characters or fewer.")
    .refine((value) => value === "" || value.replace(/\D/g, "").length >= 5, "Please enter a valid phone number.")
    .optional(),
  service: z.enum(quoteServiceValues, { errorMap: () => ({ message: "Please select a service." }) }),
  details: optionalText(2000),
  vesselName: optionalText(120),
  eta: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), "Please enter a valid date.")
    .optional(),
});

/** Checked alongside the fields (an intersection, not a refinement of them), so a missing way to reply is reported together with every other problem. */
const replyRule = z
  .object({ email: z.string().trim().optional(), phone: z.string().trim().optional() })
  .refine((data) => Boolean(data.email) || Boolean(data.phone), {
    message: "Please add an email or a phone number so we can reply.",
    path: ["email"],
  });

export const quoteSchema = quoteFields.and(replyRule) satisfies z.ZodType<QuoteFormData>;
