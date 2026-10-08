import { Link2, MapPin, SlidersHorizontal, Waypoints } from "lucide-react";

import { routes } from "@/config/routes";
import type { Principle } from "@/types/principle";

export const whyOarPageContent = {
  hero: {
    eyebrow: "Why Oar",
    title: "The operational bridge between supplier and vessel.",
    description:
      "Oar focuses on the shore-side coordination required to move marine cargo and vessel-related requirements through the port environment.",
  },
  challenge: {
    eyebrow: "The challenge",
    title: "The challenge is rarely one task.",
    paragraphs: [
      "A vessel requirement can involve suppliers, cargo preparation, documentation, customs-related requirements, transport and port coordination.",
      "The difficulty is keeping those activities connected around the vessel's requirement.",
    ],
  },
  role: {
    eyebrow: "The Oar role",
    title: "Oar coordinates the journey around the requirement.",
    paragraphs: [
      "Oar does not replace the parties along the way. It sits across the journey, keeping the activities between supplier and vessel connected.",
    ],
    action: { label: "Who Oar serves", href: routes.industries },
    diagramHeading: "Coordinates the journey around the requirement",
    nodes: [
      { label: "Supplier", description: "Where the requirement begins." },
      { label: "Coordination", description: "Aligning the parties and the timing." },
      { label: "Documentation", description: "Paperwork and customs-related requirements." },
      { label: "Transport", description: "Moving the cargo between points." },
      { label: "Port", description: "Port-side activities and handover." },
      { label: "Vessel", description: "Where the requirement is delivered." },
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "What shapes the Oar approach.",
  },
  visibility: {
    eyebrow: "Visibility",
    title: "Keep the moving parts connected.",
    paragraphs: [
      "When supplier, cargo, documentation, transport and port-side activities are coordinated together, the customer has a clearer operational picture around the requirement.",
      "That connected view is the point of coordination: decisions about timing and delivery are made with the whole journey in mind.",
    ],
    points: [
      "Activities connected rather than handled in isolation",
      "A clearer picture of the journey around the requirement",
      "Timing decisions made with context",
    ],
  },
  cta: {
    title: "Let's coordinate your next port requirement.",
    description: "Tell us what needs to move, where it needs to go and when the vessel requires it.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "Explore Services", href: routes.services },
  },
};

export const whyOarPrinciples: readonly Principle[] = [
  {
    title: "Coordination",
    description:
      "Bring suppliers, cargo, documentation, transport and port-side activity together around one requirement.",
    icon: Waypoints,
  },
  {
    title: "Local Understanding",
    description: "Work with an understanding of the UAE maritime and port environment.",
    icon: MapPin,
  },
  {
    title: "Responsive Execution",
    description: "Stay focused on the timing and coordination needed to move cargo toward the vessel.",
    icon: Link2,
  },
  {
    title: "Operational Control",
    description: "Keep each step connected to the next, so the requirement stays in view from start to delivery.",
    icon: SlidersHorizontal,
  },
];
