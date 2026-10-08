export type RouteMatch = "exact" | "section" | null;

function normalize(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/**
 * Compares the current pathname with a navigation target. Matches whole path
 * segments only, so "/services" matches "/services/x" but not "/services-old".
 */
export function matchRoute(pathname: string, href: string): RouteMatch {
  const current = normalize(pathname);
  const target = normalize(href);

  if (current === target) return "exact";
  if (target !== "/" && current.startsWith(`${target}/`)) return "section";
  return null;
}
