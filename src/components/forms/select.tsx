import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";

import { controlStyles } from "@/components/forms/control-styles";
import { cn } from "@/lib/utils";

/** Native select (best keyboard and mobile behavior) with a custom chevron. */
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(controlStyles, "h-10 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate" />
    </div>
  );
}
