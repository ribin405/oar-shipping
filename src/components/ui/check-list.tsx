import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/** Short list of statements, each marked with a decorative check. */
export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("type-body flex flex-col gap-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <Check aria-hidden="true" className="size-4 shrink-0 text-link" />
          {item}
        </li>
      ))}
    </ul>
  );
}
