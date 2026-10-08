import type { CSSProperties } from "react";

import { ServiceCard } from "@/components/cards/service-card";
import { MediaFrame } from "@/components/media/media-frame";
import { PlayOnView } from "@/components/ui/play-on-view";
import { routes } from "@/config/routes";
import { serviceCapabilities } from "@/content/services/capabilities";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types/service";

interface CapabilityGridProps {
  /** "detail" links each card to its service page; "listing" links every card to the services overview. */
  linkTo: "detail" | "listing";
  linkLabel: string;
  /** Show only these services, in the order of the capability list. */
  slugs?: readonly ServiceSlug[];
}

/** The service capabilities as cards. The one grid used wherever services are listed. */
export function CapabilityGrid({
  linkTo,
  linkLabel,
  slugs,
}: CapabilityGridProps) {
  const capabilities = serviceCapabilities.filter(
    ({ slug }) => !slugs || slugs.includes(slug),
  );

  return (
    <PlayOnView>
      <ul
        className={cn(
          "grid gap-6 md:grid-cols-2",
          capabilities.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {capabilities.map(
          ({ slug, title, description, icon: Icon, image }, index) => (
            <li
              key={slug}
              style={{ "--i": index } as CSSProperties}
              className="svc-item"
            >
              <ServiceCard
                index={slugs ? undefined : String(index + 1).padStart(2, "0")}
                icon={<Icon aria-hidden="true" />}
                title={title}
                description={description}
                href={
                  linkTo === "detail" ? routes.service(slug) : routes.services
                }
                linkLabel={linkLabel}
                media={
                  image ? (
                    <MediaFrame
                      src={image.src}
                      alt={image.alt}
                      position={image.position}
                      ratio="landscape"
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : undefined
                }
              />
            </li>
          ),
        )}
      </ul>
    </PlayOnView>
  );
}
