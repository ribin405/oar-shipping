import { routes } from "@/config/routes";

export const industriesPageContent = {
  hero: {
    eyebrow: "Industries",
    title: "Built around the needs of maritime operations.",
    description:
      "Oar's port execution model is designed for ship managers, ship chandlers and marine suppliers, shipping agents and other organizations that need marine cargo and supplies coordinated to the vessel through the UAE port environment.",
  },
  audiences: {
    eyebrow: "Audiences",
    title: "Who Oar is positioned to support.",
    description: "Five audiences whose work depends on cargo reaching the vessel at the right point in the operation.",
  },
  shared: {
    eyebrow: "The shared requirement",
    title: "Different organizations. One operational challenge.",
    paragraphs: [
      "Whatever the organization, the requirement tends to look the same: supplier, cargo, documentation, transport and port all have to connect before anything reaches the vessel.",
    ],
    action: { label: "About Oar", href: routes.about },
    diagramHeading: "Connects the flow from supplier to vessel",
    nodes: [
      { label: "Supplier" },
      { label: "Cargo" },
      { label: "Documentation" },
      { label: "Transport" },
      { label: "Port" },
      { label: "Vessel" },
    ],
  },
  capabilities: {
    eyebrow: "Relevant capabilities",
    title: "The services behind each requirement.",
    description: "The same six service areas apply across these audiences.",
    action: { label: "View all services", href: routes.services },
  },
  cta: {
    title: "Need support around a vessel requirement?",
    description: "Tell us what needs to move and where it needs to go.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "Contact Oar", href: routes.contact },
  },
};
