import type { ReactNode } from "react";

import { Section, type SectionSurface } from "@/components/layout/section";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

interface NarrativeLink {
  label: string;
  href: string;
}

interface NarrativeSectionProps {
  id: string;
  surface?: SectionSurface;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  action?: NarrativeLink;
  secondaryAction?: NarrativeLink;
  /** Visual or list shown beside the text from `lg` upward. */
  aside?: ReactNode;
}

/** Heading with one to three paragraphs, optionally paired with a visual. */
export function NarrativeSection({
  id,
  surface = "light",
  eyebrow,
  title,
  paragraphs,
  action,
  secondaryAction,
  aside,
}: NarrativeSectionProps) {
  const titleId = `${id}-title`;

  return (
    <Section id={id} surface={surface} labelledBy={titleId}>
      <div className={cn("grid items-center gap-12", Boolean(aside) && "lg:grid-cols-2 lg:gap-16")}>
        <div className="flex max-w-2xl flex-col items-start gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={titleId} className="type-h1">
            {title}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="type-body-lg text-muted">
              {paragraph}
            </p>
          ))}
          {action || secondaryAction ? (
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              {action ? <ArrowLink href={action.href}>{action.label}</ArrowLink> : null}
              {secondaryAction ? <ArrowLink href={secondaryAction.href}>{secondaryAction.label}</ArrowLink> : null}
            </div>
          ) : null}
        </div>
        {aside}
      </div>
    </Section>
  );
}
