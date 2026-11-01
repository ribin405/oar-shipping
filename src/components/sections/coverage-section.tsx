import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { coveragePorts, otherPortsLabel } from "@/content/ports/coverage";

interface CoverageSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}

/** The UAE ports Oar covers, as quiet chips. */
export function CoverageSection({ id, eyebrow, title, description }: CoverageSectionProps) {
  return (
    <Section spacing="compact" labelledBy={id}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} titleId={id} className="mb-8 md:mb-8" />
      <ul aria-label="Ports covered" className="flex flex-wrap gap-2">
        {[...coveragePorts, otherPortsLabel].map((port) => (
          <li key={port} className="chip">
            <span aria-hidden="true" className="mark" />
            {port}
          </li>
        ))}
      </ul>
    </Section>
  );
}
