import { siteConfig } from "@/lib/site-config";

/** Converts a root-relative path into an absolute URL on the configured site origin, or undefined when none is configured. */
export function absoluteUrl(path: string): string | undefined {
  if (!siteConfig.url) return undefined;
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}
