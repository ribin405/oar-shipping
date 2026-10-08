import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { PrincipleGrid } from "@/components/sections/principle-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { principles, whyOarContent } from "@/content/home/why-oar";

const TITLE_ID = "why-oar-title";

export function WhyOarSection() {
  const { eyebrow, title, description, action } = whyOarContent;

  return (
    <Section labelledBy={TITLE_ID}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleId={TITLE_ID}
        action={<ArrowLink href={action.href}>{action.label}</ArrowLink>}
      />
      <PrincipleGrid principles={principles} />
    </Section>
  );
}
