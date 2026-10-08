import { Clock, FileCheck, FileText, Package, Route, Truck, Users, Warehouse } from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface MovingPart {
  label: string;
  icon: LucideIcon;
}

/** The activities that must come together around a vessel requirement. */
export const movingParts: readonly MovingPart[] = [
  { label: "Supplier coordination", icon: Users },
  { label: "Cargo preparation", icon: Package },
  { label: "Documentation", icon: FileText },
  { label: "Customs processes", icon: FileCheck },
  { label: "Warehousing", icon: Warehouse },
  { label: "Transportation", icon: Truck },
  { label: "Port coordination", icon: Route },
  { label: "Delivery timing", icon: Clock },
];

export const problemContent = {
  eyebrow: "The operational challenge",
  title: "Getting cargo to a vessel is more than moving it from A to B.",
  description:
    "Behind every vessel delivery are suppliers, cargo movements, documentation, clearance, transport and port-side coordination. When those pieces are disconnected, vessel operations carry the complexity.",
  resolution:
    "Oar Shipping is a marine logistics and port-execution coordinator in the UAE, bringing those moving parts together from supplier door to vessel deck for ship managers, ship chandlers and shipping agents.",
  visualLabel: "Brought together by Oar",
};
