import { routes } from "@/config/routes";

interface HeroImage {
  /** Local path under /public, e.g. "/images/hero/port-hero.jpg". */
  src: string;
  /** Empty string when the photograph is decorative (the usual case for a hero). */
  alt: string;
  /** Tailwind object-position class that keeps the focal point visible, e.g. "object-[70%_center]". */
  position?: string;
}

interface HeroContent {
  eyebrow: readonly string[];
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /**
   * Approved hero photograph. While this is null the hero renders its navy
   * backdrop. To enable: add a ~2400x1350 JPEG/WebP under public/images/hero/
   * and set { src, alt: "", position }.
   */
  image: HeroImage | null;
}

export const heroContent: HeroContent = {
  eyebrow: ["Marine logistics", "Port execution"],
  title: "Creators of Calm Port Calls",
  description: "Marine logistics and port execution that connects suppliers, cargo and vessels across UAE ports.",
  primaryCta: { label: "Request a Quote", href: routes.requestQuote },
  secondaryCta: { label: "Explore Services", href: routes.services },
  image: { src: "/images/hero/Golden Harbor Sunset with Container Ship.png", alt: "", position: "object-[70%_center]" },
};
