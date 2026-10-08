import { Cable, ClipboardCheck, Crosshair } from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface TrustPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Operating-approach trust section. It describes how Oar works and makes no
 * claim about credentials, partners, clients or statistics; add those here
 * (and render them in TrustSection) only once Oar has verified them.
 */
export const trustContent = {
  eyebrow: "Operational control",
  title: "Built around operational control.",
  description:
    "Oar's role is to coordinate the shore-side details that keep vessel-related logistics moving, with clear communication and controlled execution from supplier to vessel.",
};

export const trustPoints: readonly TrustPoint[] = [
  {
    title: "One point of coordination",
    description: "Suppliers, cargo, transport and port-side activity brought into a single flow.",
    icon: Crosshair,
  },
  {
    title: "Connected documentation and movement",
    description: "Documentation and customs-related requirements coordinated alongside the cargo itself.",
    icon: Cable,
  },
  {
    title: "Requirement-led execution",
    description: "Each movement shaped by the cargo, the port and the vessel operation involved.",
    icon: ClipboardCheck,
  },
];
