import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

interface CtaLink {
  label: string;
  href: string;
}

interface CtaSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

const TITLE_ID = "cta-title";

/** Closing call to action. One per page, directly above the footer. */
export function CtaSection({ eyebrow, title, description, primaryCta, secondaryCta }: CtaSectionProps) {
  return (
    <Section surface="dark-elevated" spacing="hero" labelledBy={TITLE_ID} className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-technical-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 id={TITLE_ID} className="type-display">
          {title}
        </h2>
        <p className="type-body-lg max-w-xl text-muted">{description}</p>
        <div className="flex w-full flex-col gap-4 pt-2 sm:w-auto sm:flex-row">
          <ButtonLink href={primaryCta.href} size="lg" className="w-full sm:w-auto">
            {primaryCta.label}
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
          {secondaryCta ? (
            <ButtonLink href={secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
              {secondaryCta.label}
            </ButtonLink>
          ) : null}
        </div>
        <div aria-hidden="true" className="mt-6 flex w-full max-w-sm items-center text-link">
          <span className="size-2.5 rounded-sm bg-current" />
          <span className="h-px flex-1 border-t border-dashed border-current opacity-60" />
          <ArrowRight className="size-4" />
        </div>
      </div>
    </Section>
  );
}
