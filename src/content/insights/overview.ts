import { insightsContent } from "@/content/home/insights";
import { routes } from "@/config/routes";

export const insightsOverviewContent = {
  hero: {
    eyebrow: "Insights",
    title: "Operational knowledge for better port calls.",
    description:
      "Practical perspectives on ship chandling, customs and logistics, marine services and PDA review across UAE ports.",
  },
  intro: {
    eyebrow: "Editorial approach",
    title: "The details behind a calm port call.",
    paragraphs: [
      "A port call brings supply, clearance, boats and costs together. Our insights explain the requirements, decisions and checks involved, so owners and managers know what to expect.",
    ],
    topicsLabel: "Areas of focus",
    topics: insightsContent.topics,
  },
  featured: { eyebrow: "Featured", title: "Featured insight." },
  all: { eyebrow: "Insights", title: "All insights." },
  perspective: {
    eyebrow: "Operational perspective",
    title: "Built around operational understanding.",
    description:
      "Oar's perspective starts with the port call: what the vessel needs, what has to be cleared, which boats and teams are required, and what it should cost.",
    links: [
      { label: "Explore Services", href: routes.services },
      { label: "Why Oar", href: routes.whyOar },
    ],
  },
  cta: {
    title: "Ready to simplify your UAE port call?",
    description: "Supply, clearance and marine services with one partner.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
  },
};
