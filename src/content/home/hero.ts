import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { getWhatsAppHref } from "@/lib/contact";

interface HeroImage {
  /** Local path under /public, e.g. "/images/hero/port-hero.jpg". */
  src: string;
  /** Empty string when the photograph is decorative (the usual case for a hero). */
  alt: string;
  /** Portrait (3:4) crop used below 1024px, where the hero is a tall phone screen. */
  mobile?: { src: string };
}

interface HeroContent {
  /** Short kicker above the headline; the items are joined with " · ". */
  eyebrow: readonly string[];
  title: string;
  /** Used for the page's structured data; not shown in the hero itself. */
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Approved hero photograph, filling the hero. While null the hero is plain navy. */
  image: HeroImage | null;
}

export const heroContent: HeroContent = {
  eyebrow: [ "All UAE Ports", "24/7"],
  title: "One Partner. Every Marine Service.",
  description:
    "Ship chandling, customs clearance, logistics and marine services under one roof, with independent PDA review so owners know every dollar is worth it.",
  primaryCta: { label: "Request a Quote", href: routes.requestQuote },
  secondaryCta: { label: "WhatsApp us", href: getWhatsAppHref(contactDetails) ?? routes.contact },
  image: {
    src: "/images/hero/golden-horizon.webp",
    alt: "",
    mobile: { src: "/images/hero/golden-horizon-mobile.webp" },
  },
};
