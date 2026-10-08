import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { MediaFrame } from "@/components/media/media-frame";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { heroContent } from "@/content/home/hero";

/**
 * Homepage hero. `data-header="overlay"` makes the global header float over
 * it, transparent until the page scrolls (see `.site-header` in globals.css).
 */
export function HeroSection({ children }: { children?: ReactNode }) {
  const { eyebrow, title, description, primaryCta, secondaryCta, image } = heroContent;

  return (
    <section
      data-header="overlay"
      data-surface="dark"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(34rem,min(46rem,80svh))] flex-col overflow-hidden bg-background text-foreground"
    >
      {image ? (
        <>
          <MediaFrame
            src={image.src}
            alt={image.alt}
            ratio="fill"
            overlay="hero"
            position={image.position}
            sizes="100vw"
            preload
          />
          {/* Uniform wash for narrow screens, where copy spans the full image width. */}
          <div aria-hidden="true" className="absolute inset-0 bg-midnight/55 lg:hidden" />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgb(11_96_125/0.4),transparent_60%)]"
        />
      )}

      <div className="relative flex flex-1 items-center">
      <Container className="pt-32 pb-16 md:pt-36 md:pb-24">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <Eyebrow items={eyebrow} framed />
          <h1 id="hero-title" className="type-display max-w-xl">
            {title}
          </h1>
          <p className="type-body-lg max-w-xl text-muted">{description}</p>
          <div className="flex w-full flex-col gap-4 pt-2 sm:w-auto sm:flex-row">
            <ButtonLink href={primaryCta.href} size="lg" className="w-full sm:w-auto">
              {primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
      </div>
      {children}
    </section>
  );
}
