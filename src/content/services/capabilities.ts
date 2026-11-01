import { Anchor, ClipboardCheck, FileCheck, Package } from "lucide-react";

import type { ServiceCapability } from "@/types/service";

/**
 * Canonical list of the four Oar service divisions (name, slug, icon and
 * summary). Slugs match the /services/[slug] routes. Wording follows the
 * client's final website content.
 */
export const serviceCapabilities: readonly ServiceCapability[] = [
  {
    slug: "ship-chandling",
    title: "Ship Chandling",
    icon: Package,
    description:
      "Everything your vessel needs from one supplier, delivered at anchorage or alongside with complete documents.",
    image: {
      src: "/images/services/warehousing.jpg",
      alt: "Pallets stacked on tall racking inside a warehouse",
      position: "object-[50%_40%]",
    },
  },
  {
    slug: "customs-logistics",
    title: "Customs & Logistics",
    icon: FileCheck,
    description:
      "Clearance, documentation, freight and delivery handled end to end, across UAE ports and airports.",
    image: {
      src: "/images/services/port-coordination.jpg",
      alt: "Aerial view of stacked containers either side of a road in a port at sunset",
      position: "object-center",
    },
  },
  {
    slug: "marine-services",
    title: "Marine Services",
    icon: Anchor,
    description:
      "Boats, technical support, cash to master and diving arranged and coordinated as one port call plan.",
    image: {
      src: "/images/services/marine-services.jpg",
      alt: "A red harbour tug on calm water beside a quay",
      position: "object-center",
    },
  },
  {
    slug: "pda-review",
    title: "PDA Review",
    icon: ClipboardCheck,
    description:
      "Independent review of the agent's Proforma Disbursement Account for ship owners and managers, before you pay.",
    image: {
      src: "/images/services/customs-clearance.jpg",
      alt: "A hand signing an invoice on a clipboard",
      position: "object-[50%_45%]",
    },
  },
];
