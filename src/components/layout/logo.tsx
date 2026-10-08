import Link from "next/link";

import { routes } from "@/config/routes";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Brand logo linking to the homepage. The artwork (public/images/brand/oar-logo.png)
 * is a white-on-transparent PNG used as a mask, so it takes the current text
 * color on any surface. To replace it, change the mask URL below (an SVG works too).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href={routes.home} aria-label={`${siteConfig.name} home`} className={cn("inline-flex shrink-0 rounded-sm", className)}>
      <span
        aria-hidden="true"
        className="aspect-[640/248] h-8 bg-current mask-[url(/images/brand/oar-logo.png)] mask-contain mask-center mask-no-repeat lg:h-9"
      />
    </Link>
  );
}
