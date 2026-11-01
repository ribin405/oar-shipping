import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { PortGrid } from "@/components/sections/port-grid";
import { UaePortMap } from "@/components/sections/uae-port-map";
import { ButtonLink } from "@/components/ui/button";
import { portsContent } from "@/content/home/ports";
import { ports } from "@/content/ports";
import { coveragePorts, otherPortsLabel } from "@/content/ports/coverage";

const TITLE_ID = "ports-title";

/** Homepage coverage block: the ports Oar covers beside a drawn map of the UAE coast. */
export function PortsSection() {
  const { eyebrow, title, description, cta } = portsContent;

  return (
    <Section labelledBy={TITLE_ID}>
      <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
        <div className="flex flex-col items-start gap-6">
          <SectionHeader index="03" eyebrow={eyebrow} title={title} description={description} titleId={TITLE_ID} className="mb-0 md:mb-0" />
          <ul aria-label="Ports covered" className="flex flex-wrap gap-2">
            {[...coveragePorts, otherPortsLabel].map((port) => (
              <li key={port} className="chip">
                <span aria-hidden="true" className="mark" />
                {port}
              </li>
            ))}
          </ul>
          <ButtonLink href={cta.href} size="lg">
            {cta.label}
          </ButtonLink>
        </div>

        {ports.length > 0 ? <PortGrid ports={ports} /> : <UaePortMap />}
      </div>
    </Section>
  );
}
