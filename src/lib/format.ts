const longDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" });

/** Formats an ISO date (YYYY-MM-DD) for display, e.g. "6 October 2026". */
export function formatDate(isoDate: string): string {
  return longDate.format(new Date(`${isoDate}T00:00:00Z`));
}
