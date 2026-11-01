import type { CSSProperties } from "react";

import { Card } from "@/components/ui/card";
import { PlayOnView } from "@/components/ui/play-on-view";
import type { OfferGroup } from "@/types/service";

/** The "What we offer" grid: one card per group, each a short bulleted list or a single description. */
export function OfferGrid({ groups }: { groups: readonly OfferGroup[] }) {
  return (
    <PlayOnView>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {groups.map(({ title, items, description }, index) => (
          <li key={title} style={{ "--i": index } as CSSProperties} className="reveal reveal-up">
            <Card as="article" padding="md" className="h-full gap-4 md:p-7">
              <h3 className="type-h3 text-foreground">{title}</h3>
              {description ? <p className="type-body text-muted">{description}</p> : null}
              {items?.length ? (
                <ul className="diamond-list type-body grid gap-2.5 text-muted">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>
    </PlayOnView>
  );
}
