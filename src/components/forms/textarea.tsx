import type { ComponentProps } from "react";

import { controlStyles } from "@/components/forms/control-styles";
import { cn } from "@/lib/utils";

export function Textarea({ className, rows = 4, ...props }: ComponentProps<"textarea">) {
  return <textarea rows={rows} className={cn(controlStyles, "min-h-24 resize-y py-2", className)} {...props} />;
}
