import type { CSSProperties } from "react";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PlayOnView } from "@/components/ui/play-on-view";
import { localExecution } from "@/content/home/local-execution";
import { homeWhyOar } from "@/content/home/why-oar";

const TITLE_ID = "why-oar-title";

interface Point {
  title: string;
  text: string;
}

function Column({ title, intro, points, offset }: { title: string; intro?: string; points: readonly Point[]; offset: number }) {
  return (
    <div className="why-col">
      <h3 className="why-col__title">{title}</h3>
      {intro ? <p className="why-col__intro">{intro}</p> : null}
      <ul className="ruled">
        {points.map(({ title: pointTitle, text }, index) => (
          <li key={pointTitle} style={{ "--i": offset + index } as CSSProperties} className="reveal reveal-up">
            <strong>{pointTitle}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface WhyOarSectionProps {
  /** Section number shown in the header. */
  index?: string;
  /** The link to the Why Oar page; hide it on that page itself. */
  showAction?: boolean;
}

/** Why Oar: three ruled columns, the two sets of reasons and the local-execution offer for global brands. */
export function WhyOarSection({ index, showAction = true }: WhyOarSectionProps) {
  const { primary, secondary, action } = homeWhyOar;
  const execution = localExecution.items.map(({ title, description }) => ({ title, text: description }));

  return (
    <Section labelledBy={TITLE_ID}>
      <SectionHeader
        index={index}
        eyebrow="Why Oar"
        title={primary.title}
        titleId={TITLE_ID}
        action={showAction ? <ArrowLink href={action.href}>{action.label}</ArrowLink> : undefined}
      />
      <PlayOnView>
        <div className="why-grid">
          <Column title={primary.eyebrow} points={primary.points} offset={0} />
          <Column title={secondary.eyebrow} points={secondary.points} offset={primary.points.length} />
          <Column
            title={localExecution.eyebrow}
            intro={localExecution.description}
            points={execution}
            offset={primary.points.length + secondary.points.length}
          />
        </div>
      </PlayOnView>
    </Section>
  );
}
