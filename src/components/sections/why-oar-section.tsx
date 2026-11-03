import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { WhyOarGroups } from "@/components/sections/why-oar-groups";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PlayOnView } from "@/components/ui/play-on-view";
import { localExecution } from "@/content/home/local-execution";
import { homeWhyOar } from "@/content/home/why-oar";

const TITLE_ID = "why-oar-title";

interface WhyOarSectionProps {
  /** Section number shown in the header. */
  index?: string;
  /** The link to the Why Oar page; hide it on that page itself. */
  showAction?: boolean;
}

/** Why Oar: the two sets of reasons and the local-execution offer for global brands (see `WhyOarGroups` for the layout). */
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
        <WhyOarGroups
          groups={[
            { title: primary.eyebrow, points: primary.points },
            { title: secondary.eyebrow, points: secondary.points },
            { title: localExecution.eyebrow, intro: localExecution.description, points: execution },
          ]}
        />
      </PlayOnView>
    </Section>
  );
}
