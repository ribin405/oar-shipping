const longDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" });

/** Formats an ISO date (YYYY-MM-DD) for display, e.g. "6 October 2026". */
export function formatDate(isoDate: string): string {
  return longDate.format(new Date(`${isoDate}T00:00:00Z`));
}

/** Lower-cases the first letter only, for reusing a label mid-sentence without breaking acronyms ("All other UAE ports" becomes "all other UAE ports"). */
export function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}
