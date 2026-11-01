import { routes } from "@/config/routes";

export const servicesOverviewContent = {
  hero: {
    eyebrow: "Our Divisions",
    title: "Four divisions. One accountable partner.",
    description: "Supply, clearance, logistics and coordination handled by one team.",
    cta: { label: "Request a Quote", href: routes.requestQuote },
  },
  grid: {
    eyebrow: "Our services",
    title: "Everything for the port call, from one team.",
    description:
      "Ship chandling, customs and logistics, marine services and an independent PDA review for ship owners.",
    cardLinkLabel: "View services",
  },
  coverage: {
    eyebrow: "Coverage",
    title: "All UAE ports, one partner.",
    description: "From Fujairah and Khor Fakkan to Jebel Ali, Abu Dhabi and the northern emirates.",
  },
  cta: {
    title: "Ready to simplify your UAE port call?",
    description: "Supply, clearance and marine services with one partner.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
    secondaryCta: { label: "Contact Oar", href: routes.contact },
  },
};
