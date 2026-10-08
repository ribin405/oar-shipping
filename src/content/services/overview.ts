import { routes } from "@/config/routes";

export const servicesOverviewContent = {
  hero: {
    eyebrow: "Marine logistics • Port execution",
    title: "Port-side logistics built around the vessel requirement.",
    description:
      "Oar coordinates the supplier, cargo, documentation, transport and port-side activities that move marine cargo to the vessel. Six services, one supplier-to-vessel journey, for ship managers, ship chandlers and shipping agents.",
    cta: { label: "Request a Quote", href: routes.requestQuote },
  },
  intro: {
    eyebrow: "The service model",
    title: "One operational journey. Multiple moving parts.",
    paragraphs: [
      "A vessel requirement can involve suppliers, cargo preparation, documentation, customs-related requirements, transportation and port coordination. Oar's service model brings those activities together around the delivery requirement.",
    ],
  },
  grid: {
    eyebrow: "Our services",
    title: "Six areas of shore-side execution.",
    description: "Each one is a part of the same journey, from supplier door to vessel deck.",
    cardLinkLabel: "Explore service",
  },
  process: {
    eyebrow: "The operational flow",
    title: "How a requirement moves through the services.",
    description: "The services connect along one flow. Which steps matter most depends on the requirement.",
  },
  audiences: {
    eyebrow: "Relevant audiences",
    title: "Services shaped around maritime teams.",
    description: "The services are designed for organizations that coordinate cargo, supplies and vessel requirements.",
    action: { label: "All industries", href: routes.industries },
  },
  cta: {
    title: "Need to coordinate a vessel-related requirement?",
    description: "Tell us what needs to move, where it needs to go and when the vessel requires it.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "Contact Oar", href: routes.contact },
  },
};
