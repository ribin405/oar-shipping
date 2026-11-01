import type { CSSProperties } from "react";

import { PlayOnView } from "@/components/ui/play-on-view";

/** Numbered steps laid out in a row on wide screens and stacked on phones. */
export function ServiceProcess({ steps }: { steps: readonly string[] }) {
  return (
    <PlayOnView>
      <ol className="service-process grid gap-8 sm:grid-cols-2 lg:gap-6" style={{ "--steps": steps.length } as CSSProperties}>
        {steps.map((step, index) => (
          <li key={step} style={{ "--i": index } as CSSProperties} className="reveal reveal-up service-process__step">
            <span aria-hidden="true" className="service-process__num">
              {index + 1}
            </span>
            <p className="type-h4 text-foreground">{step}</p>
          </li>
        ))}
      </ol>
    </PlayOnView>
  );
}
