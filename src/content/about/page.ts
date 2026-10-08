import { Link2, MapPin, Timer, Waypoints } from "lucide-react";

import { routes } from "@/config/routes";
import type { Principle } from "@/types/principle";

export const aboutContent = {
  hero: {
    eyebrow: "About Oar",
    title: "Connecting the shore-side operation to the vessel.",
    description:
      "Oar focuses on marine logistics and port execution, coordinating the movement of suppliers, cargo and vessel requirements across the UAE maritime environment.",
    cta: { label: "Request a Quote", href: routes.requestQuote },
  },
  positioning: {
    eyebrow: "Creators of Calm Port Calls",
    title: "Port-side logistics involve more than moving cargo.",
    paragraphs: [
      "Oar Shipping is a marine logistics and port-execution coordinator in the UAE. Marine logistics here means the shore-side movement of cargo between suppliers and vessels; port execution means coordinating that movement through the port-side steps, from documentation and transport to timing and handover at the vessel.",
      "Suppliers, documentation, transport, port coordination and vessel requirements all need to come together at the right point in the operation.",
      "Oar's role is to coordinate those moving parts and connect the supplier side of the journey with the vessel.",
    ],
  },
  focus: {
    eyebrow: "What we focus on",
    title: "Six areas of shore-side execution.",
    description: "The services Oar brings together around a vessel requirement.",
    action: { label: "View all services", href: routes.services },
  },
  principles: {
    eyebrow: "How we work",
    title: "The principles behind the operation.",
    action: { label: "Why Oar", href: routes.whyOar },
  },
  cta: {
    title: "Have a port requirement to coordinate?",
    description: "Tell us what needs to move, where it needs to go and when the vessel requires it.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
  },
};

export const aboutPrinciples: readonly Principle[] = [
  {
    title: "Operational Coordination",
    description: "Bring the moving parts of a port-side requirement together.",
    icon: Waypoints,
  },
  {
    title: "Local Understanding",
    description: "Work with an understanding of the UAE maritime and port environment.",
    icon: MapPin,
  },
  {
    title: "Responsiveness",
    description: "Stay focused on the requirement, timing and coordination needed for execution.",
    icon: Timer,
  },
  {
    title: "Controlled Execution",
    description: "Keep cargo, transport, documentation and port-side activities connected.",
    icon: Link2,
  },
];
