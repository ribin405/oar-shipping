import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EyebrowProps {
  /** Short uppercase label placed above a heading. */
  children?: ReactNode;
  /** Alternative to children: renders items separated by decorative bullets. */
  items?: readonly string[];
  className?: string;
}

export function Eyebrow({ children, items, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "type-eyebrow text-link",
        className,
      )}
    >
      {items
        ? items.map((item, index) => (
            <Fragment key={item}>
              {index > 0 ? (
                <span aria-hidden="true" className="px-2">
                  •
                </span>
              ) : null}
              {item}
            </Fragment>
          ))
        : children}
    </p>
  );
}
