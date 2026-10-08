import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: "div" | "section" | "header" | "footer" | "nav";
  className?: string;
  children: ReactNode;
}

/** Centers content at the maximum page width with responsive gutters (16/24/32px). */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-content px-4 md:px-6 lg:px-8", className)}>{children}</Tag>;
}
