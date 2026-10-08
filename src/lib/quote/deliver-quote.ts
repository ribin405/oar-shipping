import "server-only";

import { Resend } from "resend";
import { z } from "zod";

import { serviceCapabilities } from "@/content/services/capabilities";
import { buildQuoteEmail } from "@/lib/quote/email";
import { logRfqEvent } from "@/lib/quote/log";
import type { QuoteFormData, QuoteSubmissionResult } from "@/types/quote";

const configSchema = z.object({
  apiKey: z.string().min(1),
  to: z.string().email(),
  from: z.string().min(3),
});

type DeliveryConfig = z.infer<typeof configSchema>;

const VARIABLE_NAMES = { apiKey: "RESEND_API_KEY", to: "OAR_RFQ_RECIPIENT_EMAIL", from: "OAR_RFQ_FROM_EMAIL" } as const;

/**
 * Reads delivery configuration from the server environment. Returns undefined
 * (and logs which variable names are missing or invalid, never their values)
 * unless the API key, the verified recipient and the verified sender are all set.
 * There is no fallback recipient or sender.
 */
function readConfig(): DeliveryConfig | undefined {
  const parsed = configSchema.safeParse({
    apiKey: process.env.RESEND_API_KEY?.trim(),
    to: process.env.OAR_RFQ_RECIPIENT_EMAIL?.trim(),
    from: process.env.OAR_RFQ_FROM_EMAIL?.trim(),
  });
  if (parsed.success) return parsed.data;

  const names = new Set(parsed.error.issues.map((issue) => VARIABLE_NAMES[issue.path[0] as keyof typeof VARIABLE_NAMES]));
  logRfqEvent("NOT_CONFIGURED", [...names].join(","));
  return undefined;
}

/**
 * Sends a validated quote request to the verified Oar recipient through
 * Resend. The sender is the verified Oar address; the visitor's email is only
 * the Reply-To. Success is reported only when the provider confirms delivery.
 */
export async function deliverQuote(data: QuoteFormData): Promise<QuoteSubmissionResult> {
  const config = readConfig();
  if (!config) return { success: false, code: "NOT_CONFIGURED" };

  const serviceTitle = serviceCapabilities.find((service) => service.slug === data.service)?.title ?? data.service;
  const email = buildQuoteEmail(data, serviceTitle);

  try {
    const { error } = await new Resend(config.apiKey).emails.send({
      from: config.from,
      to: config.to,
      replyTo: data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (error) {
      logRfqEvent("DELIVERY_FAILED", error.name);
      return { success: false, code: "DELIVERY_FAILED" };
    }

    return { success: true };
  } catch {
    logRfqEvent("DELIVERY_FAILED", "exception");
    return { success: false, code: "DELIVERY_FAILED" };
  }
}
