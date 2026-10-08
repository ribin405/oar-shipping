import { routes } from "@/config/routes";

export const portsOverviewContent = {
  hero: {
    eyebrow: "Ports & locations",
    title: "Port-side coordination across the UAE.",
    description:
      "Oar's operating model is built around coordinating suppliers, cargo and vessel requirements within the UAE maritime environment.",
    cta: { label: "Request a Quote", href: routes.requestQuote },
  },
  positioning: {
    eyebrow: "Why the port matters",
    title: "The port is where the moving parts meet.",
    paragraphs: [
      "Marine logistics become operational at the port, where cargo, documentation, transportation, suppliers and vessel requirements have to come together around the delivery requirement.",
      "Oar focuses on the coordination around that journey, connecting the supplier side of the requirement with the vessel.",
    ],
    diagramHeading: "Coordinates the journey to the port and the vessel",
    nodes: [
      { label: "Supplier", description: "Where the requirement begins." },
      { label: "Cargo", description: "Prepared for the movement ahead." },
      { label: "Documentation", description: "Kept in step with the cargo." },
      { label: "Transport", description: "Timed around the vessel's requirement." },
      { label: "Port", description: "Where the parts have to come together." },
      { label: "Vessel", description: "Where the requirement is delivered." },
    ],
  },
  locations: {
    eyebrow: "Operating locations",
    title: "Verified operating locations",
    description: "Where a port has been confirmed, it is listed here with its own page.",
  },
  requirement: {
    eyebrow: "Port requirements",
    title: "Every port requirement starts with the details.",
    description:
      "Port-side activity differs by port, cargo and vessel operation. Share the details below and the requirement can be understood.",
    items: [
      "Vessel name and expected arrival",
      "Port or location of delivery",
      "Cargo description and quantity",
      "Required delivery date",
      "Documentation and special handling requirements",
    ],
  },
  services: {
    eyebrow: "Services",
    title: "The services behind a port requirement.",
    description: "Each service is one part of the journey from supplier door to vessel deck.",
    action: { label: "View all services", href: routes.services },
  },
  cta: {
    title: "Need support around a UAE port requirement?",
    description: "Share the cargo, vessel, location and timing so the requirement can be understood.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "Explore Services", href: routes.services },
  },
};
