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
   * Adds hover lift and a focus ring that follows keyboard focus inside the
   * card. Pair with a stretched ArrowLink so the whole card is one link.
   */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

/** Bordered surface that adapts to the section it sits in. */
export function Card({ as: Tag = "div", padding = "lg", interactive = false, className, children }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border border-border bg- hover:card",
        paddingStyles[padding],
        interactive &&
          "transition-[box-shadow,border-color,background-color,background-color] duration-200 ease-standard hover:border-muted hover:shadow-panel has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
