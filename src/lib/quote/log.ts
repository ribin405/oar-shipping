import "server-only";

type RfqLogCode = "VALIDATION_ERROR" | "NOT_CONFIGURED" | "DELIVERY_FAILED" | "INTERNAL_ERROR" | "SPAM_SUSPECTED";

/**
 * Records a safe, structured RFQ event for the host's logs. Only a category
 * and an optional non-sensitive detail (such as a missing variable name or a
 * provider error name) are logged: never submitted data, addresses or secrets.
 */
export function logRfqEvent(code: RfqLogCode, detail?: string): void {
  console.error(JSON.stringify({ event: "rfq", code, ...(detail ? { detail } : {}) }));
}
