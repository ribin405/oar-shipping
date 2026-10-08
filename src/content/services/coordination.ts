import { FileCheck, FileText, Package, Route, Ship, Truck, Users, Warehouse } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { CoordinationKind } from "@/types/service";

/** One label and icon per activity, so every service page names them consistently. */
export const coordinationKinds: Record<CoordinationKind, { label: string; icon: LucideIcon }> = {
  supplier: { label: "Supplier coordination", icon: Users },
  cargo: { label: "Cargo preparation", icon: Package },
  documentation: { label: "Documentation", icon: FileText },
  customs: { label: "Customs-related requirements", icon: FileCheck },
  transport: { label: "Transportation", icon: Truck },
  storage: { label: "Storage coordination", icon: Warehouse },
  port: { label: "Port-side coordination", icon: Route },
  delivery: { label: "Vessel delivery", icon: Ship },
};
