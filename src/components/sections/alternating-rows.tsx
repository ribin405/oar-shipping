import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

import { MediaFrame } from "@/components/media/media-frame";
import { IconBox } from "@/components/ui/icon-box";
import { PlayOnView } from "@/components/ui/play-on-view";
import type { ContentImage } from "@/types/content";
import { cn } from "@/lib/utils";

export interface AlternatingRowItem {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: ContentImage;
}

/** Image and text rows that alternate sides, each sliding in from its own side. */
export function AlternatingRows({ items }: { items: readonly AlternatingRowItem[] }) {
  return (
    <PlayOnView className="overflow-x-clip">
      <ul className="flex flex-col">
        {items.map(({ key, title, description, icon: Icon, image }, index) => {
          const reversed = index % 2 === 1;

          return (
            <li
              key={key}
              style={{ "--i": index } as CSSProperties}
              className={cn(
                "reveal border-border py-8 first:pt-0 last:pb-0 md:py-12 [&:not(:first-child)]:border-t",
                reversed ? "reveal-right" : "reveal-left",
              )}
            >
              <article className="industry-row grid items-center gap-5 md:grid-cols-2 md:gap-10 lg:gap-16">
                {image ? (
                  <div className={cn("overflow-hidden rounded-lg shadow-panel", reversed && "md:order-2")}>
                    <MediaFrame
                      src={image.src}
                      alt={image.alt}
                      position={image.position}
                      ratio="landscape"
                      className="media-wash"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                ) : null}
                <div className="flex max-w-xl flex-col items-start gap-3 md:gap-4">
                  <IconBox>
                    <Icon aria-hidden="true" />
                  </IconBox>
                  <h3 className="type-h2 text-foreground">{title}</h3>
                  <p className="type-body-lg text-muted">{description}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </PlayOnView>
  );
}
