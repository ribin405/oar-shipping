import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { industriesIntro } from "@/content/home/sections";

const TITLE_ID = "industries-title";

export function IndustriesSection() {
  const { eyebrow, title, description, viewAll } = industriesIntro;

  return (
    <Section labelledBy={TITLE_ID}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleId={TITLE_ID}
        action={<ArrowLink href={viewAll.href}>{viewAll.label}</ArrowLink>}
      />
      <IndustryGrid />
    </Section>
  );
}
