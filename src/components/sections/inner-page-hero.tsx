import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MediaFrame } from "@/components/media/media-frame";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

interface HeroPhoto {
  /** Local path under /public. */
  src: string;
  /** Empty string for a decorative photograph. */
  alt: string;
}

interface InnerPageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  /** Optional row of metadata (dates, author) shown under the description. */
  meta?: ReactNode;
  /** Optional element shown beside the copy from `lg` upward. */
  visual?: ReactNode;
  /** Smaller headline for long titles. */
  compactTitle?: boolean;
  /** A photograph for the hero: full-width behind the copy (`band`) or beside it (`split`). Without one the hero is text only. */
  photo?: HeroPhoto;
  layout?: "band" | "split";
}

const TITLE_ID = "page-title";

/**
 * Opening band for inner pages: the page's single <h1>, a lead and an optional
 * CTA. Text only by default; give it a `photo` for the editorial layouts
 * (`.page-hero` in components.css).
 */
export function InnerPageHero({
  eyebrow,
  title,
  description,
  cta,
  meta,
  visual,
  compactTitle = false,
  photo,
  layout = "band",
}: InnerPageHeroProps) {
  if (photo && layout === "band") {
    return (
      <section aria-labelledby={TITLE_ID} className="page-hero page-hero--band">
        <div className="page-hero__photo">
          <MediaFrame src={photo.src} alt={photo.alt} ratio="fill" sizes="100vw" preload />
        </div>
        <Container>
          <div className="page-hero__copy">
            <p className="page-hero__kick">{eyebrow}</p>
            <h1 id={TITLE_ID} className="page-hero__title">
              {title}
            </h1>
            <p className="page-hero__lead">{description}</p>
            {cta ? (
              <ButtonLink href={cta.href} variant="secondary" size="lg" className="page-hero__cta">
                {cta.label}
              </ButtonLink>
            ) : null}
          </div>
        </Container>
      </section>
    );
  }

  if (photo) {
    return (
      <section aria-labelledby={TITLE_ID} className="page-hero page-hero--split">
        <Container>
          <div className="page-hero__grid">
            <div className="page-hero__text">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 id={TITLE_ID} className="page-hero__title">
                {title}
              </h1>
              <p className="type-body-lg max-w-xl text-muted">{description}</p>
              {cta ? (
                <ButtonLink href={cta.href} size="lg" className="mt-1 w-full sm:w-auto">
                  {cta.label}
                </ButtonLink>
              ) : null}
            </div>
            <div className="page-hero__side">
              <MediaFrame src={photo.src} alt={photo.alt} ratio="fill" sizes="(min-width: 1024px) 50vw, 100vw" preload />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <Section spacing="compact" labelledBy={TITLE_ID}>
      <div className={cn("grid items-center gap-8 md:gap-10", Boolean(visual) && "lg:grid-cols-12")}>
        <div className={cn("flex max-w-3xl flex-col items-start gap-5 md:gap-6", Boolean(visual) && "lg:col-span-7")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id={TITLE_ID} className={cn("text-balance", compactTitle ? "type-h1 max-w-[26ch]" : "type-display max-w-[19ch]")}>
            {title}
          </h1>
          <p className="type-body-lg max-w-2xl text-muted">{description}</p>
          {meta}
          {cta ? (
            <ButtonLink href={cta.href} size="lg" className="mt-1 w-full sm:w-auto">
              {cta.label}
            </ButtonLink>
          ) : null}
        </div>
        {visual ? <div className="lg:col-span-5">{visual}</div> : null}
      </div>
    </Section>
  );
}
