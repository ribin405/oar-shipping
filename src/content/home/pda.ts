import { routes } from "@/config/routes";

export const pdaTeaser = {
  eyebrow: "PDA Review for Ship Owners",
  title: "Know your port costs are worth it.",
  description:
    "Send us the agent's PDA. We check it line by line against real port costs and tell you what is fair, high or missing before you pay.",
  primaryCta: { label: "Learn about PDA Review", href: routes.service("pda-review") },
  /** Photograph beside the text. */
  image: { src: "/images/divisions/pda-review.jpg", alt: "A hand signing an invoice on a clipboard" },
};
