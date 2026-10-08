import { Section, type SectionSurface } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { RouteFlow } from "@/components/ui/route-flow";
import { processContent } from "@/content/home/process";

const TITLE_ID = "process-title";

interface ProcessSectionProps {
  surface?: SectionSurface;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Step labels ("01" to "05") to emphasise, for pages about one part of the journey. */
  highlight?: readonly string[];
}

/** The five-step operating model. Defaults to the homepage copy. */
export function ProcessSection({
  surface = "muted",
  eyebrow = processContent.eyebrow,
  title = processContent.title,
  description = processContent.description,
  highlight,
}: ProcessSectionProps) {
  const steps = processContent.steps.map((step) => ({ ...step, highlighted: highlight?.includes(step.label) }));

  return (
    <Section surface={surface} labelledBy={TITLE_ID}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} titleId={TITLE_ID} />
      <RouteFlow steps={steps} layout="xl" className="xl:items-stretch" />
      <p className="type-body-sm mt-12 max-w-xl text-muted">{processContent.disclaimer}</p>
    </Section>
  );
}
