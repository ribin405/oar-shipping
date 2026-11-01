import type { CSSProperties } from "react";

import { ServiceBentoCard } from "@/components/cards/service-bento-card";
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
  /** Show only these services, in the order of the capability list. Without it every service is shown as the bento grid. */
  slugs?: readonly ServiceSlug[];
}

function hrefFor(linkTo: CapabilityGridProps["linkTo"], slug: ServiceSlug): string {
  return linkTo === "detail" ? routes.service(slug) : routes.services;
}

/**
 * The one grid used wherever services are listed. All services render as the
 * bento composition (a feature tile beside a wide tile); a subset renders as
 * compact image cards.
 */
export function CapabilityGrid({ linkTo, linkLabel, slugs }: CapabilityGridProps) {
  const capabilities = serviceCapabilities.filter(({ slug }) => !slugs || slugs.includes(slug));

  if (!slugs) {
    return (
      <PlayOnView>
        <ul className="grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:gap-4 lg:auto-rows-[13.5rem] lg:grid-cols-4">
          {capabilities.map(({ slug, title, description, image }, index) => {
            const isFeature = index === 0;
            const isWide = index === 1;
            const size = isFeature ? "feature" : isWide ? "wide" : "standard";

            return (
              <li
                key={slug}
                style={{ "--i": index } as CSSProperties}
                className={cn("reveal reveal-up", isFeature && "col-span-2 row-span-2", isWide && "col-span-2")}
              >
                <ServiceBentoCard
                  index={String(index + 1).padStart(2, "0")}
                  title={title}
                  description={description}
                  href={hrefFor(linkTo, slug)}
                  linkLabel={linkLabel}
                  size={size}
                  media={
                    image ? (
                      <MediaFrame
                        src={image.src}
                        alt={image.alt}
                        position={image.position}
                        ratio="fill"
                        className="media-wash -z-10"
                        sizes={isFeature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                      />
                    ) : null
                  }
                />
              </li>
            );
          })}
        </ul>
      </PlayOnView>
    );
  }

  return (
    <PlayOnView>
      <ul className={cn("grid gap-5 md:grid-cols-2 xl:gap-6", capabilities.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3")}>
        {capabilities.map(({ slug, title, description, icon: Icon, image }, index) => (
          <li key={slug} style={{ "--i": index } as CSSProperties} className="reveal reveal-up">
            <ServiceCard
              icon={<Icon aria-hidden="true" />}
              title={title}
              description={description}
              href={hrefFor(linkTo, slug)}
              linkLabel={linkLabel}
              media={
                image ? (
                  <MediaFrame
                    src={image.src}
                    alt={image.alt}
                    position={image.position}
                    ratio="standard"
                    className="media-wash"
                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                  />
                ) : undefined
              }
            />
          </li>
        ))}
      </ul>
    </PlayOnView>
  );
}
