/**
 * Single source of truth for public URL paths.
 * Reference these helpers instead of writing route strings in components.
 */
export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  industries: "/industries",
  ports: "/ports",
  port: (slug: string) => `/ports/${slug}`,
  whyOar: "/why-oar",
  insights: "/insights",
  insight: (slug: string) => `/insights/${slug}`,
  contact: "/contact",
  requestQuote: "/request-a-quote",
} as const;
