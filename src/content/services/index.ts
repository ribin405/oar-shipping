import { cargoTransportation } from "@/content/services/cargo-transportation";
import { serviceCapabilities } from "@/content/services/capabilities";
import { customsClearance } from "@/content/services/customs-clearance";
import { portCoordination } from "@/content/services/port-coordination";
import { portLogistics } from "@/content/services/port-logistics";
import { vesselDelivery } from "@/content/services/vessel-delivery";
import { warehousing } from "@/content/services/warehousing";
import { validateServices } from "@/lib/content-validation";
import type { Service, ServiceDetailContent, ServiceSlug } from "@/types/service";

/** Typed as a Record so the compiler fails if any approved service is missing its detail content. */
const details: Record<ServiceSlug, ServiceDetailContent> = {
  "port-logistics": portLogistics,
  "vessel-delivery": vesselDelivery,
  "customs-clearance": customsClearance,
  warehousing,
  "cargo-transportation": cargoTransportation,
  "port-coordination": portCoordination,
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
