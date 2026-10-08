import { Anchor, Ship, Download, Package, Warehouse } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Checkbox } from "@/components/forms/checkbox";
import { FormField } from "@/components/forms/form-field";
import { Input } from "@/components/forms/input";
import { Select } from "@/components/forms/select";
import { Textarea } from "@/components/forms/textarea";
import { IndustryCard } from "@/components/cards/industry-card";
import { InsightCard } from "@/components/cards/insight-card";
import { PortCard } from "@/components/cards/port-card";
import { ServiceCard } from "@/components/cards/service-card";
import { Section, type SectionSurface } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RouteFlow } from "@/components/ui/route-flow";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const flowSteps = [
  { label: "Stage 01", title: "Sample origin", description: "Neutral placeholder copy for the first step.", icon: <Package /> },
  {
    label: "Stage 02",
    title: "Sample middle step",
    description: "Neutral placeholder copy for the highlighted step.",
    icon: <Anchor />,
    highlighted: true,
  },
  { label: "Stage 03", title: "Sample destination", description: "Neutral placeholder copy for the last step.", icon: <Ship /> },
] as const;

const placeholderMedia = (ratio: string) => (
  <div className={`${ratio} bg-deep-navy`} role="img" aria-label="Placeholder image" />
);

function Showcase({ surface, children }: { surface: SectionSurface; children: ReactNode }) {
  return (
    <Section surface={surface} spacing="compact">
      <SectionHeader eyebrow={`Surface: ${surface}`} title="Sample section heading" description="Lead paragraph in muted text on this surface." />
      <div className="flex flex-wrap items-center gap-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="dark">Dark</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </Section>
  );
}

/** Development-only reference for the design system. Not compiled as a route in production (see next.config.ts). */
export default function DesignSystemPage() {
  return (
    <>
      <Section>
        <Eyebrow items={["Marine logistics", "Port execution"]} />
        <h1 className="type-display mt-3">Display heading</h1>
        <p className="type-h1 mt-6">H1 heading</p>
        <p className="type-h2 mt-4">H2 heading</p>
        <p className="type-h3 mt-4">H3 heading</p>
        <p className="type-h4 mt-4">H4 heading</p>
        <p className="type-body-lg mt-4">Body large. Readable paragraph text for lead copy.</p>
        <p className="type-body mt-2">Body. Standard interface and card text.</p>
        <p className="type-body-sm mt-2">Body small. Captions and metadata.</p>
        <p className="type-label mt-2">Label</p>
        <Eyebrow className="mt-2">Eyebrow</Eyebrow>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>Neutral</Badge>
          <Badge tone="active">Active</Badge>
          <Badge tone="confirmed">Confirmed</Badge>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ButtonLink href="/design-system" size="lg">
            Large link button <Download />
          </ButtonLink>
          <ButtonLink href="/design-system" variant="secondary" size="lg">
            Secondary large
          </ButtonLink>
        </div>
        <div className="mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          <FormField label="Text input" helperText="Helper text." required>
            {(props) => <Input placeholder="Placeholder" {...props} />}
          </FormField>
          <FormField label="Input with error" error="Error message.">
            {(props) => <Input defaultValue="Invalid value" {...props} />}
          </FormField>
          <FormField label="Select">
            {(props) => (
              <Select {...props} defaultValue="">
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="a">Option A</option>
              </Select>
            )}
          </FormField>
          <FormField label="Disabled input">{(props) => <Input disabled defaultValue="Disabled" {...props} />}</FormField>
          <div className="md:col-span-2">
            <FormField label="Textarea">{(props) => <Textarea {...props} />}</FormField>
          </div>
          <Checkbox label="Checkbox with helper" helperText="Helper text." />
          <Checkbox label="Checkbox with error" error="Error message." />
        </div>
      </Section>

      <Showcase surface="light">
        <ServiceCard
          index="01"
          icon={<Warehouse />}
          title="Sample service"
          description="Neutral placeholder description for a service card."
          href="/design-system"
          linkLabel="Link label"
          media={placeholderMedia("aspect-[3/2]")}
        />
        <IndustryCard icon={<Ship />} title="Sample industry" description="Neutral placeholder description for an industry card." />
        <InsightCard
          title="Sample article title"
          excerpt="Neutral placeholder excerpt."
          href="/design-system"
          linkLabel="Link label"
          category="Category"
          meta="Meta"
          media={placeholderMedia("aspect-video")}
        />
      </Showcase>

      <Showcase surface="muted">
        <ServiceCard title="Sample service" description="Neutral placeholder description." href="/design-system" linkLabel="Link label" />
        <IndustryCard icon={<Anchor />} title="Linked industry" description="Whole card is one link." href="/design-system" linkLabel="Link label" />
        <PortCard
          region="Region"
          badge="Badge"
          title="Sample location"
          description="Neutral placeholder description."
          details={[
            { label: "Label one", value: "Value one" },
            { label: "Label two", value: "Value two" },
          ]}
        />
      </Showcase>

      <Showcase surface="dark">
        <ServiceCard
          index="01"
          icon={<Warehouse />}
          title="Sample service"
          description="Neutral placeholder description."
          href="/design-system"
          linkLabel="Link label"
        />
        <PortCard
          region="Region"
          badge="Badge"
          title="Sample location"
          details={[{ label: "Label one", value: "Value one" }]}
          href="/design-system"
          linkLabel="Link label"
        />
        <IndustryCard icon={<Ship />} title="Sample industry" description="Neutral placeholder description." />
      </Showcase>

      <Section surface="dark-elevated">
        <SectionHeader
          align="center"
          eyebrow="Surface: dark-elevated"
          title="Sample flow heading"
          description="Directional flow that stacks vertically on mobile."
        />
        <RouteFlow steps={flowSteps} />
      </Section>

      <Section surface="muted" spacing="compact">
        <SectionHeader
          eyebrow="Route flow on muted"
          title="Sample flow on a light surface"
          action={<ButtonLink href="/design-system" variant="secondary">Header action</ButtonLink>}
        />
        <RouteFlow steps={flowSteps} />
      </Section>
    </>
  );
}
