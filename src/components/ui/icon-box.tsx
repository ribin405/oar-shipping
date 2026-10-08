import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface IconBoxProps {
  /** A decorative lucide icon. Sized to 20px by this component. */
  children: ReactNode;
  className?: string;
}

/** 40px bordered tile that frames a decorative icon. */
export function IconBox({ children, className }: IconBoxProps) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-link [&_svg]:size-5",
        className,
      )}
    >
      {children}
    </span>
  );
}
