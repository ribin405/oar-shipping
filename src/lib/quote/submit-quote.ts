"use server";

import { deliverQuote } from "@/lib/quote/deliver-quote";
import { HONEYPOT_FIELD } from "@/lib/quote/honeypot";
import { logRfqEvent } from "@/lib/quote/log";
import { quoteSchema } from "@/lib/validation/quote";
import type { QuoteFieldErrors, QuoteSubmissionResult } from "@/types/quote";

function isHoneypotFilled(input: unknown): boolean {
  if (typeof input !== "object" || input === null) return false;
  const value = (input as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim() !== "";
}

/**
 * The submission boundary used by the quote form (a Server Action: it runs
 * only on the server, and Next.js rejects calls whose Origin does not match
 * the host). The input is untrusted: it is validated again here with the same
 * schema as the client, and only then delivered.
 */
export async function submitQuote(input: unknown): Promise<QuoteSubmissionResult> {
  try {
    // Bots that fill the hidden field get an ordinary success response and nothing is sent.
    if (isHoneypotFilled(input)) {
      logRfqEvent("SPAM_SUSPECTED");
      return { success: true };
    }

    const parsed = quoteSchema.safeParse(input);
    if (!parsed.success) {
      logRfqEvent("VALIDATION_ERROR");
      const fieldErrors: QuoteFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof QuoteFieldErrors | undefined;
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      return { success: false, code: "VALIDATION_ERROR", fieldErrors };
    }

    return await deliverQuote(parsed.data);
  } catch {
    logRfqEvent("INTERNAL_ERROR");
    return { success: false, code: "INTERNAL_ERROR" };
  }
}
