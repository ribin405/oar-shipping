import { Link2, MapPin, Timer, Waypoints } from "lucide-react";

import { routes } from "@/config/routes";
import type { Principle } from "@/types/principle";

export const whyOarContent = {
  eyebrow: "Why Oar",
  action: { label: "Why Oar in detail", href: routes.whyOar },
  title: "We coordinate the shore-side complexity around the vessel.",
  description:
    "From supplier coordination and cargo movement to documentation, transport and port-side execution, Oar focuses on connecting the moving parts that sit between the supplier and the vessel.",
};

/** Positioning statements only; none is a quantitative promise. */
export const principles: readonly Principle[] = [
  {
    title: "Operational Coordination",
    description: "Bring the moving parts of a port-side requirement together around one operational flow.",
    icon: Waypoints,
  },
  {
    title: "Local Understanding",
    description: "Work with an understanding of the UAE maritime and port environment.",
    icon: MapPin,
  },
  {
    title: "Responsive Execution",
    description: "Stay focused on the requirement, timing and coordination needed to move cargo toward the vessel.",
    icon: Timer,
  },
  {
    title: "Controlled Delivery",
    description: "Keep supplier, cargo, transport and port-side activities connected through execution.",
    icon: Link2,
  },
];
