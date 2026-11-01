import { ArrowRight } from "lucide-react";
import { getImageProps } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Container } from "@/components/layout/container";
import { heroContent } from "@/content/home/hero";

/**
 * Homepage hero: a full-bleed photograph with the headline and two actions on a
 * navy scrim. It runs up behind the floating header (see `.hero` in home.css).
 */
export function HeroSection() {
  const { eyebrow, title, primaryCta, secondaryCta, image } = heroContent;
  const words = title.split(" ");

  // Art direction: a portrait crop below 1024px, the landscape photograph above. Only the matching file
  // downloads; fetchPriority stands in for `preload`, which would fetch both.
  const common = {
    alt: image?.alt ?? "",
    fill: true as const,
    sizes: "100vw",
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const desktop = image ? getImageProps({ ...common, src: image.src }).props : null;
  const mobile = image?.mobile ? getImageProps({ ...common, src: image.mobile.src }).props : null;
  const photo = mobile ?? desktop;

  return (
    <section aria-labelledby="hero-title" className="hero">
      {photo && desktop ? (
        <div className="hero__photo">
          <picture>
            <source media="(min-width: 64rem)" srcSet={desktop.srcSet} sizes="100vw" />
            <img {...photo} alt={photo.alt} className="hero__img" />
          </picture>
        </div>
      ) : null}

      <div className="hero__copy">
        <Container>
          <p className="hero__kick">{eyebrow.join(" · ")}</p>
          <h1 id="hero-title" className="hero__title">
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                {index > 0 ? " " : null}
                <span className="hero__word">
                  <span style={{ "--k": index } as CSSProperties}>{word}</span>
                </span>
              </span>
            ))}
          </h1>
          <div className="hero__actions">
            <Link href={primaryCta.href} className="btn-light">
              {primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href={secondaryCta.href} className="link-light">
              {secondaryCta.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
