import { routes } from "@/config/routes";
import { hasInsights } from "@/content/insights";

export interface NavigationItem {
  label: string;
  href: string;
}

/** Primary navigation links. Desktop and mobile navigation must both consume this. */
export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Industries", href: routes.industries },
  { label: "Ports & Locations", href: routes.ports },
  ...(hasInsights ? [{ label: "Insights", href: routes.insights }] : []),
  { label: "Contact", href: routes.contact },
];

/** Highlighted call-to-action rendered alongside the primary links. */
export const navigationCta: NavigationItem = {
  label: "Request a Quote",
  href: routes.requestQuote,
};
