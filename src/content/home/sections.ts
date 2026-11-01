import { routes } from "@/config/routes";
import type { ServiceSlug } from "@/types/service";

export const servicesIntro = {
  eyebrow: "Our Divisions",
  title: "Four divisions. One accountable partner.",
  description: "Supply, clearance, logistics and coordination handled by one team.",
  cardLinkLabel: "View division",
  viewAll: { label: "View all services", href: routes.services },
  /** Cover photograph for each division's panel, under /public/images/divisions. */
  panelImages: {
    "ship-chandling": "/images/divisions/ship-chandling.jpg",
    "customs-logistics": "/images/divisions/customs-logistics.jpg",
    "marine-services": "/images/divisions/marine-services.jpg",
    "pda-review": "/images/divisions/pda-review.jpg",
  } satisfies Record<ServiceSlug, string>,
};
