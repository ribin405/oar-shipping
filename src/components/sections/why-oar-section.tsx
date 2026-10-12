import type { CSSProperties } from "react";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { PlayOnView } from "@/components/ui/play-on-view";
import { principles, whyOarContent } from "@/content/home/why-oar";

const TITLE_ID = "why-oar-title";

export function WhyOarSection() {
  const { eyebrow, title, description, action } = whyOarContent;

  return (
    <Section labelledBy={TITLE_ID} className="why-oar-section pt-8 md:pt-12">
      <PlayOnView className="why-oar-motion">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          titleId={TITLE_ID}
          action={<ArrowLink href={action.href}>{action.label}</ArrowLink>}
          className="why-oar-intro"
        />
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {principles.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="why-oar-card relative pt-5" style={{ "--why-index": index } as CSSProperties}>
              <span aria-hidden="true" className="absolute top-0 left-0 h-px w-full bg-border" />
              <span aria-hidden="true" className="why-oar-node absolute -top-1 left-0 size-2.5 rounded-full bg-link" />
              <Card as="article" padding="md" className="why-oar-card-surface h-full gap-5 bg-card">
                <IconBox className="why-oar-icon">
                  <Icon aria-hidden="true" />
                </IconBox>
                <div className="flex flex-col gap-2">
                  <h3 className="type-h3 text-foreground">{title}</h3>
                  <p className="type-body text-muted">{description}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </PlayOnView>
    </Section>
  );
}
