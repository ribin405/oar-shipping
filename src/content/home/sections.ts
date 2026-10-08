import { routes } from "@/config/routes";

export const servicesIntro = {
  eyebrow: "Our services",
  title: "Port-side execution built around the vessel.",
  description:
    "From cargo coordination and customs clearance to transportation and vessel delivery, Oar brings the shore-side pieces together around the operational requirement.",
  cardLinkLabel: "Explore service",
  viewAll: { label: "View all services", href: routes.services },
};

export const industriesIntro = {
  eyebrow: "Who we serve",
  title: "Built around the teams responsible for keeping vessels moving.",
  description:
    "Oar supports the companies coordinating vessel supply, cargo movement and port-side requirements across UAE maritime operations.",
  viewAll: { label: "View all industries", href: routes.industries },
};
