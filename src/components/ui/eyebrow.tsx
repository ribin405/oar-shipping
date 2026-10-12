import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EyebrowProps {
  /** Short uppercase label placed above a heading. */
  children?: ReactNode;
  /** Alternative to children: renders items separated by decorative bullets. */
  items?: readonly string[];
  /** Draws a bordered chip; use for hero overlines on imagery. */
  framed?: boolean;
  className?: string;
}

export function Eyebrow({ children, items, framed = false, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "type-eyebrow text-link",
        framed && "inline-flex rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md",
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
