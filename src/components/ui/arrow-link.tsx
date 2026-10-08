import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  /**
   * Extends the link's click area over the nearest `relative` ancestor,
   * so a whole card is clickable through one real link.
   */
  stretched?: boolean;
  className?: string;
  children: ReactNode;
}

/** Text call-to-action with a trailing arrow. */
export function ArrowLink({ href, stretched = false, className, children }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "type-body group/link inline-flex items-center gap-2 font-semibold text-link transition-colors duration-200 ease-standard hover:text-foreground",
        stretched && "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 ease-standard motion-safe:group-hover/link:translate-x-0.5"
      />
    </Link>
  );
}
