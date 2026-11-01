import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Short label under the number (or alone, on pages that do not number their sections). */
  eyebrow?: string;
  /** Section number such as "01"; shown in the left column. */
  index?: string;
  title: string;
  description?: string;
  /** Id for the heading element; pass the same value to Section's `labelledBy`. */
  titleId?: string;
  /** Heading level. Use "h1" only for the page's primary heading. */
  as?: "h1" | "h2";
  /** Optional trailing element, such as a link to a listing page. */
  action?: ReactNode;
  className?: string;
}

/** Opens every section: a hairline rule, a number or label, a serif title and a lead paragraph. */
export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  titleId,
  as: Heading = "h2",
  action,
  className,
}: SectionHeaderProps) {
  const hasLabel = Boolean(index || eyebrow);

  return (
    <div className={cn("section-header", className)}>
      <div className={cn("section-header__rule", !hasLabel && "section-header__rule--bare")}>
        {hasLabel ? (
          <p className="section-header__label">
            {index ? <span className="section-header__index">{index}</span> : null}
            {eyebrow ? <span className="section-header__eyebrow">{eyebrow}</span> : null}
          </p>
        ) : null}
        <div>
          <Heading id={titleId} className={cn("section-header__title", Heading === "h1" ? "type-display" : "type-title")}>
            {title}
          </Heading>
          {description ? <p className="section-header__desc">{description}</p> : null}
        </div>
        {action ? <div className="section-header__action">{action}</div> : null}
      </div>
    </div>
  );
}
