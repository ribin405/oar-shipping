import type { CSSProperties } from "react";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { PlayOnView } from "@/components/ui/play-on-view";
import { portCallContent } from "@/content/home/port-call";

const TITLE_ID = "port-call-title";

interface PortCallSectionProps {
  /** Section number, on pages that number their sections (the homepage). */
  index?: string;
}

/** How a port call runs: four stages in one ruled row, and the activities Oar plans together. */
export function PortCallSection({ index }: PortCallSectionProps) {
  const { eyebrow, title, description, stages, activitiesLabel, activities } = portCallContent;

  return (
    <Section labelledBy={TITLE_ID}>
      <SectionHeader index={index} eyebrow={eyebrow} title={title} description={description} titleId={TITLE_ID} />
      <PlayOnView>
        <ol className="process">
          {stages.map(({ label, title: stageTitle, description: stageDescription, emphasis }, position) => (
            <li
              key={label}
              style={{ "--i": position } as CSSProperties}
              className={emphasis ? "process__step process__step--emphasis reveal reveal-up" : "process__step reveal reveal-up"}
            >
              <span className="process__no">{label}</span>
              <h3 className="process__title">{stageTitle}</h3>
              <p className="process__text">{stageDescription}</p>
            </li>
          ))}
        </ol>
      </PlayOnView>
      <p className="process-note">
        <b>{activitiesLabel}:</b> {activities.join(" · ")}
      </p>
    </Section>
  );
}
