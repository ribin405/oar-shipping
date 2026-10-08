import { routes } from "@/config/routes";
import { serviceCapabilities } from "@/content/services/capabilities";
import type { NavigationItem } from "@/config/navigation";

/** Footer groupings are separate from primary navigation by design. */
export const footerServiceLinks: readonly NavigationItem[] = serviceCapabilities.map(({ slug, title }) => ({
  label: title,
  href: routes.service(slug),
}));

export const footerCompanyLinks: readonly NavigationItem[] = [
  { label: "About", href: routes.about },
  { label: "Why Oar", href: routes.whyOar },
  { label: "Industries", href: routes.industries },
  { label: "Ports & Locations", href: routes.ports },
  { label: "Insights", href: routes.insights },
  { label: "Contact", href: routes.contact },
];

/** Add Privacy Policy and Terms here once those pages exist; the footer renders them automatically. */
export const footerLegalLinks: readonly NavigationItem[] = [];
