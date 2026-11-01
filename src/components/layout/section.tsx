import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SectionSpacing = "default" | "compact" | "tight" | "hero";

/** Vertical rhythm: 40/56px default, 32/40px compact, 24/32px tight, 96/160px hero. */
const spacingStyles: Record<SectionSpacing, string> = {
  default: "py-10 md:py-14",
  compact: "py-8 md:py-10",
  tight: "py-6 md:py-8",
  hero: "py-24 md:py-40",
};

interface SectionProps {
  spacing?: SectionSpacing;
  id?: string;
  /** Id of the section's heading, so the region has an accessible name. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Page section: standard vertical spacing and the content container. It paints
 * no background of its own, so the site canvas shows through every section.
 */
export function Section({ spacing = "default", id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(spacingStyles[spacing], className)}>
      <Container>{children}</Container>
    </section>
  );
}
