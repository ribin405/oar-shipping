import { Briefcase, ClipboardList, Network, Package, Waves } from "lucide-react";

import { validateAudiences } from "@/lib/content-validation";
import type { IndustryAudience } from "@/types/industry";

/**
 * Approved target audiences, the single source for the homepage and the
 * Industries page. They describe who Oar positions itself for; they are not
 * statements about existing customers or contracts.
 */
export const industryAudiences: readonly IndustryAudience[] = [
  {
    slug: "ship-management",
    image: { src: "/images/industries/ship-management.jpg", alt: "Interior of a ship bridge with windows looking out over calm water", position: "object-center" },
    title: "Ship Management Companies",
    icon: ClipboardList,
    summary: "Support vessel-related logistics requirements with coordinated shore-side execution.",
    pageDescription: "Support vessel-related logistics and port-side requirements through coordinated execution.",
  },
  {
    slug: "marine-suppliers",
    image: { src: "/images/industries/marine-suppliers.jpg", alt: "The hull of a large container ship under a warm sunset sky", position: "object-center" },
    title: "Marine Suppliers / Ship Chandlers",
    icon: Package,
    summary: "Connect chandler and supplier cargo with the transportation and port-side steps required for delivery to the vessel.",
    pageDescription: "Connect supplier-side cargo movement with vessel delivery requirements.",
  },
  {
    slug: "shipping-agents",
    image: { src: "/images/industries/shipping-agents.jpg", alt: "A red harbour tug on calm water beside a quay", position: "object-center" },
    title: "Shipping Agents",
    icon: Briefcase,
    summary: "Coordinate cargo and port-side requirements around vessel operations.",
    pageDescription: "Coordinate supporting logistics around vessel calls and operational requirements.",
  },
  {
    slug: "freight-forwarders",
    image: { src: "/images/industries/freight-forwarders.jpg", alt: "Aerial view of colourful stacked containers in a container terminal", position: "object-center" },
    title: "Freight Forwarders / Logistics Companies",
    icon: Network,
    summary: "Extend cargo movement into the port and vessel-delivery side of the journey.",
    pageDescription: "Support marine cargo movements that require port-side coordination and vessel delivery.",
  },
  {
    slug: "marine-offshore",
    image: { src: "/images/industries/marine-offshore.jpg", alt: "An offshore platform silhouetted against a vivid sunset over the sea", position: "object-[50%_60%]" },
    title: "Marine & Offshore",
    icon: Waves,
    summary: "Support marine and offshore requirements involving cargo, transportation and coordinated delivery.",
    pageDescription: "Coordinate logistics requirements associated with marine and offshore operations.",
  },
];

validateAudiences(industryAudiences);
