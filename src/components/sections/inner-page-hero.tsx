import type { ReactNode } from "react";

import { Section, type SectionSurface } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

interface InnerPageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  /** Optional row of metadata (dates, author) shown under the description. */
  meta?: ReactNode;
  /** Optional element shown beside the copy from `lg` upward. */
  visual?: ReactNode;
  variant?: Extract<SectionSurface, "dark" | "light">;
}

const TITLE_ID = "page-title";

/** Opening band for inner pages: the page's single <h1>, a lead and an optional CTA. */
export function InnerPageHero({ eyebrow, title, description, cta, meta, visual, variant = "dark" }: InnerPageHeroProps) {
  return (
    <Section surface={variant} labelledBy={TITLE_ID} className="relative overflow-hidden">
      {variant === "dark" ? <div aria-hidden="true" className="bg-technical-grid absolute inset-0 opacity-40" /> : null}
      <div className={cn("relative grid items-center gap-12", Boolean(visual) && "lg:grid-cols-12")}>
        <div className={cn("flex max-w-3xl flex-col items-start gap-6", Boolean(visual) && "lg:col-span-7")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id={TITLE_ID} className="type-display">
            {title}
          </h1>
          <p className="type-body-lg max-w-2xl text-muted">{description}</p>
          {meta}
          {cta ? (
            <ButtonLink href={cta.href} size="lg" className="mt-2">
              {cta.label}
            </ButtonLink>
          ) : null}
        </div>
        {visual ? <div className="lg:col-span-5">{visual}</div> : null}
      </div>
    </Section>
  );
}
