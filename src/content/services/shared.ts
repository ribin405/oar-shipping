import { routes } from "@/config/routes";

/** Copy shared by every service detail page. Service-specific copy lives in each service file. */
export const servicePageContent = {
  problemEyebrow: "The requirement",
  roleEyebrow: "The Oar role",
  roleDiagramHeading: "Coordinates the path between them",
  roleNodes: [
    { label: "Supplier Door", description: "Where the requirement begins." },
    { label: "Oar Execution", description: "Coordination across the journey." },
    { label: "Vessel Deck", description: "Where the requirement is delivered." },
  ],
  roleLinks: {
    whyOar: { label: "Why Oar", href: routes.whyOar },
    about: { label: "About Oar", href: routes.about },
  },
  coordinates: { eyebrow: "What we coordinate", title: "The activities that may be involved." },
  process: { eyebrow: "How it works", title: "Where this service sits in the journey." },
  requirements: {
    eyebrow: "What to share",
    title: "Information that may help us assess the requirement.",
    note: "Not every detail is needed at the start. Share what you have and we can work out the rest together.",
  },
  industries: {
    eyebrow: "Relevant audiences",
    title: "Who this service is relevant to.",
    action: { label: "All industries", href: routes.industries },
  },
  related: {
    eyebrow: "Related services",
    title: "Services that often connect to this one.",
    action: { label: "View all services", href: routes.services },
  },
  faq: { eyebrow: "Questions", title: "Common questions." },
  cta: {
    title: "Planning a vessel-related requirement?",
    description: "Share the cargo, location, port and timing, and we can understand the requirement.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "Explore All Services", href: routes.services },
  },
};
