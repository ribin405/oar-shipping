import { routes } from "@/config/routes";

/** Copy shared by every port detail page. Port-specific copy lives in the port entry. */
export const portPageContent = {
  heroEyebrow: "UAE ports",
  overviewEyebrow: "About the port",
  oarRole: { eyebrow: "The Oar role" },
  services: {
    eyebrow: "Relevant services",
    title: "Services that may be involved.",
    action: { label: "View all services", href: routes.services },
  },
  considerations: { eyebrow: "Planning", title: "Operational considerations." },
  industries: {
    eyebrow: "Relevant audiences",
    title: "Who this is relevant to.",
    action: { label: "All industries", href: routes.industries },
  },
  faq: { eyebrow: "Questions", title: "Common questions." },
  cta: {
    title: "Need support around a UAE port requirement?",
    description: "Share the cargo, vessel, location and timing so the requirement can be understood.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "Explore Services", href: routes.services },
  },
};
