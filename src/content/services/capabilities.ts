import { Anchor, FileCheck, Route, Ship, Truck, Warehouse } from "lucide-react";

import type { ServiceCapability } from "@/types/service";

/**
 * Canonical list of the six approved Oar service areas (name, slug, icon and
 * summary). Slugs match the /services/[slug] routes. Descriptions are
 * deliberately conservative: no licences, fleets, certifications or port permissions.
 */
export const serviceCapabilities: readonly ServiceCapability[] = [
  {
    slug: "port-logistics",
    title: "Port Logistics",
    icon: Anchor,
    description: "Coordinate the movement and handling of cargo around vessel and port requirements.",
    image: { src: "/images/services/port-logistics.jpg", alt: "Cranes silhouetted against an orange sunset over calm water", position: "object-[50%_55%]" },
  },
  {
    slug: "vessel-delivery",
    title: "Vessel Delivery",
    icon: Ship,
    description: "Coordinate cargo delivery from the shore-side supply chain to the vessel.",
    image: { src: "/images/services/vessel-delivery.jpg", alt: "A yellow and black crane hook hanging against a clear sky", position: "object-[50%_30%]" },
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance",
    icon: FileCheck,
    description: "Support the documentation and customs processes required for cargo movement.",
    image: { src: "/images/services/customs-clearance.jpg", alt: "A hand signing an invoice on a clipboard", position: "object-[50%_45%]" },
  },
  {
    slug: "warehousing",
    title: "Warehousing",
    icon: Warehouse,
    description: "Coordinate the holding and preparation of cargo before movement.",
    image: { src: "/images/services/warehousing.jpg", alt: "Pallets stacked on tall racking inside a warehouse", position: "object-[50%_40%]" },
  },
  {
    slug: "cargo-transportation",
    title: "Cargo Transportation",
    icon: Truck,
    description: "Coordinate the transportation of cargo between suppliers, facilities and port operations.",
    image: { src: "/images/services/cargo-transportation.jpg", alt: "A freight truck on an open road beneath mountains and heavy clouds", position: "object-[30%_70%]" },
  },
  {
    slug: "port-coordination",
    title: "Port Coordination",
    icon: Route,
    description: "Bring suppliers, transport, documentation and port-side activities together around the requirement.",
    image: { src: "/images/services/port-coordination.jpg", alt: "Aerial view of stacked containers either side of a road in a port at sunset", position: "object-center" },
  },
];
