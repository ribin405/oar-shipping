import type { ComponentProps } from "react";

import { controlStyles } from "@/components/forms/control-styles";
import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} className={cn(controlStyles, "h-10", className)} {...props} />;
}
