import { routes } from "@/config/routes";

/**
 * About page copy, from the client's final website content. Company history,
 * licence numbers and the founder message have not been supplied, so they stay out.
 */
export const aboutContent = {
  hero: {
    eyebrow: "About Oar Shipping",
    title: "A UAE marine services group, based in Fujairah.",
    description:
      "Ship chandling, customs and logistics, marine services and independent PDA review, with one partner and one point of contact.",
    cta: { label: "Request a Quote", href: routes.requestQuote },
    photo: { src: "/images/hero/golden-horizon.webp", alt: "" },
  },
  advantage: {
    eyebrow: "Our Advantage",
    title: "Why clients choose us",
    points: [
      { title: "24/7 operations", text: "Across UAE ports." },
      { title: "Port relationships", text: "Strong links with authorities, agents and suppliers." },
      { title: "Fast communication", text: "Digital RFQs and WhatsApp support." },
      { title: "Local execution partner", text: "Trusted by global brands to deliver on the ground in the UAE." },
      { title: "Owner-side transparency", text: "Independent PDA review." },
    ],
  },
  group: {
    eyebrow: "Group",
    title: "Oar Shipping Group",
  },
};
