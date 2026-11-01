import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardPadding = "none" | "md" | "lg";

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  md: "p-6",
  lg: "p-6 md:p-8",
};

interface CardProps {
  as?: ElementType;
  padding?: CardPadding;
  /**
   * Adds hover lift, a gold-to-cyan line along the bottom edge and a focus ring
   * that follows keyboard focus inside the card. Pair with a stretched ArrowLink
   * so the whole card is one link.
   */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

/** White card with a hairline border and a gold top edge. */
export function Card({ as: Tag = "div", padding = "lg", interactive = false, className, children }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border border-border border-t-2 border-t-gold/80 bg-card shadow-card",
        paddingStyles[padding],
        interactive &&
          "card-interactive hover:shadow-panel has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
