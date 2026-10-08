import type { CSSProperties } from "react";

import { IndustryCard } from "@/components/cards/industry-card";
import { PlayOnView } from "@/components/ui/play-on-view";
import { MediaFrame } from "@/components/media/media-frame";
import { industryAudiences } from "@/content/industries/audiences";
import { cn } from "@/lib/utils";
import type { AudienceSlug } from "@/types/industry";

interface IndustryGridProps {
  /** `detail` uses the longer Industries page description. */
  variant?: "summary" | "detail";
  /** Show only these audiences, in canonical order. */
  slugs?: readonly AudienceSlug[];
}

/** The target audiences as cards. */
export function IndustryGrid({
  variant = "summary",
  slugs,
}: IndustryGridProps) {
  const audiences = industryAudiences.filter(
    ({ slug }) => !slugs || slugs.includes(slug),
  );
  /** Keeps the last card from leaving a gap: wide on tablet for odd counts, and beside one card on desktop for five. */
  const lastCardSpan =
    audiences.length === 5
      ? "md:last:col-span-2"
      : audiences.length === 3
        ? "md:max-lg:last:col-span-2"
        : undefined;

  return (
    <PlayOnView className="overflow-x-clip">
      <ul
        className={cn(
          "grid gap-6 md:grid-cols-2",
          audiences.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {audiences.map(
          (
            { slug, title, summary, pageDescription, icon: Icon, image },
            index,
          ) => (
            <li
              key={slug}
              style={{ "--i": index } as CSSProperties}
              className={cn("ind-item", lastCardSpan)}
            >
              <IndustryCard
                media={
                  image ? (
                    <MediaFrame
                      src={image.src}
                      alt={image.alt}
                      position={image.position}
                      ratio="landscape"
                      className={
                        audiences.length === 5 && index === 4
                          ? "md:aspect-[32/9]"
                          : undefined
                      }
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : undefined
                }
                icon={<Icon aria-hidden="true" />}
                title={title}
                description={variant === "detail" ? pageDescription : summary}
              />
            </li>
          ),
        )}
      </ul>
    </PlayOnView>
  );
}
