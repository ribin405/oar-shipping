export interface SiteConfig {
  name: string;
  tagline: string;
  defaultTitle: string;
  description: string;
  /**
   * Canonical public origin (no path, no trailing slash), from NEXT_PUBLIC_SITE_URL.
   * Undefined when it is missing or invalid in a production build: the site then
   * emits no canonical URLs or sitemap entries and robots.txt disallows crawling,
   * rather than publishing localhost. Local development falls back to localhost.
   */
  url: string | undefined;
  /** False for non-production deployments (e.g. Vercel previews) and when no valid public origin is configured: nothing is indexable. */
  indexable: boolean;
  /** Approved social-sharing image as a root-relative path under /public. Null until Oar supplies one. */
  ogImage: { path: string; alt: string; width: number; height: number } | null;
  defaultLocale: string;
}

const DEVELOPMENT_SITE_URL = "http://localhost:3000";

const name = "Oar Shipping";
const tagline = "Marine Logistics & Port Execution";
const isProduction = process.env.NODE_ENV === "production";
/** A production origin must be public: loopback hosts are treated as unconfigured. */
const LOCAL_HOSTNAMES = /^(localhost|127\.\d+\.\d+\.\d+|0\.0\.0\.0|\[::1?\])$/i;

function resolveSiteUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return isProduction ? undefined : DEVELOPMENT_SITE_URL;

  try {
    const { origin, protocol, hostname } = new URL(raw);
    if (!isProduction) return origin;
    return protocol === "https:" && !LOCAL_HOSTNAMES.test(hostname) ? origin : undefined;
  } catch {
    return undefined;
  }
}

const url = resolveSiteUrl();

export const siteConfig: SiteConfig = {
  name,
  tagline,
  defaultTitle: `${name} | ${tagline}`,
  description:
    "Oar Shipping is an international B2B marine logistics and port-execution company operating in the UAE.",
  url,
  indexable: url !== undefined && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production"),
  ogImage: null,
  defaultLocale: "en",
};
