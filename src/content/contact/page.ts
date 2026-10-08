import { Anchor, FileText, MessageSquare } from "lucide-react";

import { routes } from "@/config/routes";
import type { Principle } from "@/types/principle";

export const contactContent = {
  hero: {
    eyebrow: "Contact Oar",
    title: "Let's discuss your port-side requirement.",
    description:
      "Share what you need to move, where it needs to go and when it is required. Oar's team can assess the operational requirement and determine the appropriate next step.",
  },
  intro: {
    eyebrow: "Where to begin",
    title: "Start with the requirement.",
    paragraphs: [
      "Marine logistics often begins with a practical requirement: cargo that needs to move, documentation that needs coordinating, or a vessel delivery that has to happen around a defined operational window.",
      "The more detail available at the outset, the easier it is to understand the requirement and determine the appropriate logistics and port-side coordination.",
    ],
    diagramHeading: "Coordinates the journey between them",
    nodes: [
      { label: "Supplier", description: "Where the requirement begins." },
      { label: "Cargo", description: "What needs to move." },
      { label: "Port", description: "Where the parts come together." },
      { label: "Vessel", description: "Where it needs to arrive." },
    ],
  },
  engage: {
    eyebrow: "Ways to engage",
    title: "Three ways to open the conversation.",
  },
  guidance: {
    eyebrow: "Before you get in touch",
    title: "Useful information to share",
    description:
      "This is intake guidance, not a checklist every enquiry must satisfy. Share what you have and the rest can be worked out together.",
    items: [
      "Cargo type or requirement",
      "Pickup or supplier location",
      "Delivery port",
      "Vessel name",
      "Estimated arrival or required delivery timing",
      "Cargo dimensions or quantity where relevant",
      "Documentation or clearance requirements",
      "Any special handling requirements",
    ],
  },
  details: {
    eyebrow: "Contact details",
    title: "Reach Oar directly.",
  },
  cta: {
    title: "Have a requirement to discuss?",
    description:
      "Share the operational details and start the conversation around your next port-side requirement.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "Explore Services", href: routes.services },
  },
};

/** Informational pathways, intentionally not links: the page's closing call to action leads to the quote form. */
export const engagementPaths: readonly Principle[] = [
  {
    title: "General Enquiry",
    description: "Discuss a marine logistics or port-execution requirement.",
    icon: MessageSquare,
  },
  {
    title: "Port Support",
    description: "Share the vessel, cargo, location and timing when port-side coordination is required.",
    icon: Anchor,
  },
  {
    title: "Request a Quote",
    description: "Provide the requirement details needed to assess scope and prepare the next step.",
    icon: FileText,
  },
];
