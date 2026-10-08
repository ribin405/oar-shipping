import { validatePorts } from "@/lib/content-validation";
import type { Port } from "@/types/port";

/**
 * The canonical collection of verified Oar ports. Intentionally empty: Oar
 * has not yet confirmed any specific port. Adding a verified entry here is
 * all it takes for it to get a /ports/[slug] page, a sitemap entry and a card
 * on the ports overview and homepage. Do not add a port because it exists;
 * add it only when Oar's role there is confirmed.
 */
export const ports: readonly Port[] = [];

validatePorts(ports);

export function getPort(slug: string): Port | undefined {
  return ports.find((port) => port.slug === slug);
}
