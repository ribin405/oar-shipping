import type { LabelHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Marks the field as required visually; also set `required` on the control. */
  required?: boolean;
}

export function Label({ required = false, className, children, ...props }: LabelProps) {
  return (
    <label className={cn("type-label text-foreground", className)} {...props}>
      {children}
      {required ? (
        <span aria-hidden="true" className="ml-0.5 text-error">
          *
        </span>
      ) : null}
    </label>
  );
}
