import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Id for the heading element; pass the same value to Section's `labelledBy`. */
  titleId?: string;
  /** Heading level. Use "h1" only for the page's primary heading. */
  as?: "h1" | "h2";
  align?: "start" | "center";
  /** Optional trailing element, such as a link to a listing page. */
  action?: ReactNode;
  className?: string;
}

/** Eyebrow, heading and lead paragraph that open a section. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  as: Heading = "h2",
  align = "start",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-10 md:mb-16",
        Boolean(action) && !centered && "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex max-w-2xl flex-col gap-3", centered && "mx-auto items-center text-center")}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading id={titleId} className={Heading === "h1" ? "type-display" : "type-h1"}>
          {title}
        </Heading>
        {description ? <p className="type-body-lg text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
