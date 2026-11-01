import { serviceCapabilities } from "@/content/services/capabilities";
import { customsLogistics } from "@/content/services/customs-logistics";
import { marineServices } from "@/content/services/marine-services";
import { pdaReview } from "@/content/services/pda-review";
import { shipChandling } from "@/content/services/ship-chandling";
import { validateServices } from "@/lib/content-validation";
import type { Service, ServiceDetailContent, ServiceSlug } from "@/types/service";

/** Typed as a Record so the compiler fails if any approved service is missing its detail content. */
const details: Record<ServiceSlug, ServiceDetailContent> = {
  "ship-chandling": shipChandling,
  "customs-logistics": customsLogistics,
  "marine-services": marineServices,
  "pda-review": pdaReview,
};

/** The canonical collection: each capability record merged with its detail content. */
export const services: readonly Service[] = serviceCapabilities.map((capability) => ({
  ...capability,
  ...details[capability.slug],
}));

validateServices(services);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
