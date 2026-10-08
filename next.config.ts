import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Baseline Content-Security-Policy. The site loads nothing from other origins,
 * so everything is restricted to 'self'. `script-src` and `style-src` keep
 * 'unsafe-inline' because Next.js writes inline bootstrap scripts and React
 * style attributes into statically generated pages (a nonce or hash policy
 * would need per-request dynamic rendering). The directives that matter most
 * here are the ones that need no nonce: no framing, no plugins, no base-tag or
 * form-target hijacking, and no connections or resources to other origins.
 * Development is excluded because React Refresh needs eval and websockets.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isProduction ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }] : []),
];

const nextConfig: NextConfig = {
  /** `page.dev.tsx` files (the design-system reference) are routes in development only. */
  pageExtensions: isProduction ? ["tsx", "ts"] : ["dev.tsx", "tsx", "ts"],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
