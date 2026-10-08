import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MovingPartsPanel } from "@/components/sections/moving-parts-panel";
import { problemContent } from "@/content/home/problem";

const TITLE_ID = "problem-title";

/** Explains the operational complexity behind a vessel delivery, then points to Oar. */
export function ProblemSection() {
  const { eyebrow, title, description, resolution } = problemContent;

  return (
    <Section labelledBy={TITLE_ID}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader eyebrow={eyebrow} title={title} description={description} titleId={TITLE_ID} className="mb-8 md:mb-8" />
          <p className="type-h4 max-w-2xl border-l-2 border-link pl-4 text-foreground">{resolution}</p>
        </div>
        <MovingPartsPanel />
      </div>
    </Section>
  );
}
