import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "active" | "confirmed";

const toneStyles: Record<BadgeTone, string> = {
  neutral: "border-border bg-foreground/3 text-muted",
  active: "border-accent bg-accent/12 text-link",
  confirmed: "border-primary bg-primary/12 text-link",
};

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

/** Compact status or category chip (24px high, 4px radius). */
export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "type-eyebrow inline-flex h-6 items-center rounded-sm border px-2 tracking-wider",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
