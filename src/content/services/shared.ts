import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { getWhatsAppHref } from "@/lib/contact";

/** Copy shared by every service detail page. Service-specific copy lives in each service file. */
export const servicePageContent = {
  process: { eyebrow: "How It Works", title: "Our process" },
  coverage: { eyebrow: "Coverage", title: "All UAE ports" },
  related: {
    eyebrow: "Related services",
    title: "Services that often connect to this one.",
    action: { label: "View all services", href: routes.services },
  },
  cta: {
    eyebrow: "Request a Quote",
    title: "Tell us what your vessel needs.",
    description: "Send details and we will respond.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "WhatsApp Us", href: getWhatsAppHref(contactDetails) ?? routes.contact },
  },
};
