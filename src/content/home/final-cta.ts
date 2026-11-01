import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { getWhatsAppHref } from "@/lib/contact";

export const finalCtaContent = {
  title: "Ready to simplify your UAE port call?",
  description: "Supply, clearance and marine services with one partner.",
  primaryCta: { label: "Request a Quote", href: routes.requestQuote },
  secondaryCta: { label: "WhatsApp Us", href: getWhatsAppHref(contactDetails) ?? routes.contact },
};
