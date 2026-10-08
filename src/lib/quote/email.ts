import type { QuoteFormData } from "@/types/quote";

export interface QuoteEmail {
  subject: string;
  text: string;
  html: string;
}

interface Row {
  label: string;
  value: string | undefined;
}

interface Section {
  title: string;
  rows: Row[];
}

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escapes text for safe inclusion in HTML. Every user-supplied value passes through this. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ESCAPES[character] ?? character);
}

function sectionsFor(data: QuoteFormData, serviceTitle: string): Section[] {
  return [
    {
      title: "Contact",
      rows: [
        { label: "Full name", value: data.name },
        { label: "Company", value: data.company },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Country", value: data.country },
      ],
    },
    {
      title: "Requirement",
      rows: [
        { label: "Service", value: serviceTitle },
        { label: "Cargo type", value: data.cargoType },
        { label: "Cargo details", value: data.cargoDetails },
      ],
    },
    {
      title: "Movement",
      rows: [
        { label: "Pickup / Supplier Location", value: data.pickupLocation },
        { label: "Delivery port", value: data.deliveryPort },
        { label: "Vessel name", value: data.vesselName },
        { label: "Vessel ETA", value: data.eta },
        { label: "Required delivery date", value: data.requiredDeliveryDate },
      ],
    },
    { title: "Additional information", rows: [{ label: "Additional requirements", value: data.additionalRequirements }] },
  ]
    .map((section) => ({ ...section, rows: section.rows.filter((row) => row.value && row.value.trim() !== "") }))
    .filter((section) => section.rows.length > 0);
}

/**
 * Builds the notification email for a validated quote request. The subject
 * contains only the canonical service title (never raw user input), the HTML
 * escapes every value, and only fields the visitor actually filled in appear.
 */
export function buildQuoteEmail(data: QuoteFormData, serviceTitle: string): QuoteEmail {
  const sections = sectionsFor(data, serviceTitle);

  const text = sections
    .map((section) => [section.title.toUpperCase(), ...section.rows.map((row) => `${row.label}: ${row.value}`)].join("\n"))
    .join("\n\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#10212b;max-width:640px">
<h1 style="font-size:18px;margin:0 0 16px">New quote request</h1>
${sections
  .map(
    (section) => `<h2 style="font-size:14px;margin:20px 0 8px;color:#0b607d;text-transform:uppercase">${escapeHtml(section.title)}</h2>
<table style="border-collapse:collapse;width:100%">${section.rows
      .map(
        (row) =>
          `<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#647481;white-space:nowrap">${escapeHtml(row.label)}</td><td style="padding:4px 0;vertical-align:top">${escapeHtml(row.value ?? "").replace(/\r?\n/g, "<br>")}</td></tr>`,
      )
      .join("")}</table>`,
  )
  .join("\n")}
</div>`;

  return { subject: `New Oar Shipping Quote Request — ${serviceTitle}`, text, html };
}
