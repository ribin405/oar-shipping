import { routes } from "@/config/routes";

/** Contact page copy. The hero is the client's wording; the offices come from config/contact.ts. */
export const contactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Operations desk, 24/7.",
    description: "Send your request or call us any time.",
    cta: { label: "Request a Quote", href: routes.requestQuote },
  },
  offices: {
    eyebrow: "Offices",
    title: "Two offices on the east coast.",
  },
  details: {
    eyebrow: "Contact details",
    title: "Reach Oar directly.",
  },
};
