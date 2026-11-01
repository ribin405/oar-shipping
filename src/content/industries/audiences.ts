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
    summary: "One partner for stores, clearance and marine services across a vessel's UAE port call.",
    pageDescription: "One partner for stores, clearance and marine services across a vessel's UAE port call.",
  },
  {
    slug: "marine-suppliers",
    image: { src: "/images/industries/marine-suppliers.jpg", alt: "The hull of a large container ship under a warm sunset sky", position: "object-center" },
    title: "Marine Suppliers / Ship Chandlers",
    icon: Package,
    summary: "Local delivery, clearance and documentation for supplies bound for vessels at UAE ports.",
    pageDescription: "Local delivery, clearance and documentation for supplies bound for vessels at UAE ports.",
  },
  {
    slug: "shipping-agents",
    image: { src: "/images/industries/shipping-agents.jpg", alt: "A red harbour tug on calm water beside a quay", position: "object-center" },
    title: "Shipping Agents",
    icon: Briefcase,
    summary: "Boats, technical teams and cash to master arranged alongside your port call.",
    pageDescription: "Boats, technical teams and cash to master arranged alongside your port call.",
  },
  {
    slug: "freight-forwarders",
    image: { src: "/images/industries/freight-forwarders.jpg", alt: "Aerial view of colourful stacked containers in a container terminal", position: "object-center" },
    title: "Freight Forwarders / Logistics Companies",
    icon: Network,
    summary: "Customs, warehousing and transport into and out of UAE ports and airports.",
    pageDescription: "Customs, warehousing and transport into and out of UAE ports and airports.",
  },
  {
    slug: "marine-offshore",
    image: { src: "/images/industries/marine-offshore.jpg", alt: "An offshore platform silhouetted against a vivid sunset over the sea", position: "object-[50%_60%]" },
    title: "Marine & Offshore",
    icon: Waves,
    summary: "Supply, boats and technical support for marine and offshore operations.",
    pageDescription: "Supply, boats and technical support for marine and offshore operations.",
  },
];

validateAudiences(industryAudiences);
