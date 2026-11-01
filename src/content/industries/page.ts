import { routes } from "@/config/routes";

export const industriesPageContent = {
  hero: {
    eyebrow: "Industries",
    title: "Built around the needs of maritime operations.",
    photo: { src: "/images/divisions/marine-services.jpg", alt: "" },
    description:
      "Oar serves ship managers, chandlers and marine suppliers, shipping agents, freight forwarders and marine and offshore operators with supply, clearance and marine services across all UAE ports.",
  },
  audiences: {
    eyebrow: "Audiences",
    title: "Who Oar is positioned to support.",
    description: "Five audiences whose port calls depend on supply, clearance and marine services arriving on time.",
  },
  shared: {
    eyebrow: "The shared requirement",
    title: "Different organizations. One port call.",
    paragraphs: [
      "Whatever the organization, a vessel's port call needs supply, customs, boats and technical teams planned together. Oar coordinates them as one, with one point of contact.",
    ],
    action: { label: "About Oar", href: routes.about },
  },
  capabilities: {
    eyebrow: "Relevant capabilities",
    title: "The services behind each requirement.",
    description: "The same four divisions serve all of these audiences.",
    action: { label: "View all services", href: routes.services },
  },
};
