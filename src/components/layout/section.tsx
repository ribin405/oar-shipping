import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export type SectionSurface = "light" | "muted" | "dark" | "dark-elevated";
type SectionSpacing = "default" | "compact" | "tight" | "hero";

/** Vertical rhythm: 64/96px default, 48/64px compact, 32/40px tight, 96/160px hero. */
const spacingStyles: Record<SectionSpacing, string> = {
  default: "py-16 md:py-24",
  compact: "py-12 md:py-16",
  tight: "py-8 md:py-10",
  hero: "py-24 md:py-40",
};

interface SectionProps {
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  id?: string;
  /** Id of the section's heading, so the region has an accessible name. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Full-bleed page section. Sets the surface (descendants adapt through
 * semantic tokens), standard vertical spacing and the content container.
 */
export function Section({
  surface = "light",
  spacing = "default",
  id,
  labelledBy,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-surface={surface}
      className={cn("bg-background text-foreground", spacingStyles[spacing], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
