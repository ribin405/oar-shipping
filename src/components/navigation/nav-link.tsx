"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { matchRoute } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  /** Applied when the current route is this link's page or one of its child pages. */
  activeClassName?: string;
  children: ReactNode;
}

/** Navigation link that reports the current page or section to assistive technology. */
export function NavLink({ href, className, activeClassName, children }: NavLinkProps) {
  const match = matchRoute(usePathname(), href);

  return (
    <Link
      href={href}
      aria-current={match === "exact" ? "page" : match === "section" ? "true" : undefined}
      className={cn(className, match && activeClassName)}
    >
      {children}
    </Link>
  );
}
