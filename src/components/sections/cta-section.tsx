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
  spacing?: "compact" | "hero";
  layout?: "centered" | "editorial";
}

const TITLE_ID = "cta-title";

/** Closing call to action. One per page, directly above the footer. */
export function CtaSection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  spacing = "compact",
  layout = "centered",
}: CtaSectionProps) {
  const editorial = layout === "editorial";

  const heading = (
    <h2 id={TITLE_ID} className="type-display">
      {title}
    </h2>
  );

  const actions = (className: string) => (
    <div className={className}>
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
  );

  return (
    <Section
      surface="dark-elevated"
      spacing={spacing}
      labelledBy={TITLE_ID}
      className={editorial ? "relative overflow-hidden home-final-cta" : "relative overflow-hidden"}
    >
      {!editorial ? <div aria-hidden="true" className="bg-technical-grid absolute inset-0 opacity-40" /> : null}
      {editorial ? (
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-end lg:gap-16">
          <div className="flex max-w-3xl flex-col items-start gap-5">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {heading}
            <p className="type-body-lg max-w-2xl text-muted">{description}</p>
          </div>
          {actions("flex w-full flex-col gap-3 sm:flex-row lg:justify-end")}
        </div>
      ) : (
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {heading}
          <p className="type-body-lg max-w-xl text-muted">{description}</p>
          {actions("flex w-full flex-col gap-4 pt-2 sm:w-auto sm:flex-row")}
          <div aria-hidden="true" className="mt-6 flex w-full max-w-sm items-center text-link">
            <span className="size-2.5 rounded-sm bg-current" />
            <span className="h-px flex-1 border-t border-dashed border-current opacity-60" />
            <ArrowRight className="size-4" />
          </div>
        </div>
      )}
    </Section>
  );
}
