import { insightsContent } from "@/content/home/insights";
import { routes } from "@/config/routes";

export const insightsOverviewContent = {
  hero: {
    eyebrow: "Insights",
    title: "Operational knowledge for better port calls.",
    description:
      "Perspectives on marine logistics, port execution and the coordination required to move cargo from supplier to vessel.",
  },
  intro: {
    eyebrow: "Editorial approach",
    title: "The details behind a calm port call.",
    paragraphs: [
      "Port-side logistics depend on many moving parts. Our insights are designed to explain the requirements, decisions and coordination involved in getting cargo where it needs to go.",
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
      "Oar's perspective on marine logistics starts with the requirement: what needs to move, where it needs to go and what has to be coordinated around the vessel.",
    links: [
      { label: "Explore Services", href: routes.services },
      { label: "Why Oar", href: routes.whyOar },
    ],
  },
  cta: {
    title: "Have a port requirement to coordinate?",
    description: "Tell us what needs to move, where it needs to go and when the vessel requires it.",
    primaryCta: { label: "Request a Quote", href: routes.requestQuote },
  },
};
