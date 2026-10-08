import type { CSSProperties } from "react";

import { PlayOnView } from "@/components/ui/play-on-view";
import { movingParts, problemContent } from "@/content/home/problem";

/** Disconnected activities converging on one coordinated flow. Decorative lines; the list carries the meaning. */
export function MovingPartsPanel() {
  return (
    <PlayOnView surface="muted" className="relative overflow-hidden rounded-lg border border-border bg-primary/50 p-6 md:p-8">
      <div aria-hidden="true" className="bg-technical-grid absolute inset-0" />
      <ul className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
        {movingParts.map(({ label, icon: Icon }, index) => (
          <li
            key={label}
            style={{ "--i": index } as CSSProperties}
            className="mp-item group type-label flex items-center gap-3 rounded-md border border-dashed border-muted bg-card px-4 py-3 text-foreground transition-[transform,border-color] duration-200 ease-standard hover:-translate-y-0.5 hover:border-solid hover:bg-deep-navy/40"
          >
            <Icon aria-hidden="true" className="size-5 shrink-0 text-link transition-colors duration-200 group-hover:text-focus" />
            {label}
          </li>
        ))}
      </ul>

      <div className="relative mt-2 flex flex-col items-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 400 64"
          preserveAspectRatio="none"
          className="mp-curves h-14 w-full text-link"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {[25, 135, 265, 375].map((x) => (
            <path key={x} d={`M${x} 0 C ${x} 40, 200 24, 200 60`} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <p className="mp-label type-eyebrow rounded-sm border border-link bg-card px-4 py-2 text-link">
          {problemContent.visualLabel}
        </p>
      </div>
    </PlayOnView>
  );
}
