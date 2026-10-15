import { Anchor, Package, Ship, Waypoints } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { flowContent } from "@/content/home/flow";

const TITLE_ID = "flow-title";

const stages = [
  {
    label: "01",
    title: "Supplier",
    description: "Cargo is prepared for onward movement.",
    icon: <Package aria-hidden="true" />,
    emphasis: false,
  },
  {
    label: "02",
    title: "Coordination",
    description: "Suppliers, cargo, documentation and timing are brought together.",
    icon: <Waypoints aria-hidden="true" />,
    emphasis: true,
  },
  {
    label: "03",
    title: "Port execution",
    description: "Applicable transport, documentation and port-side activities are coordinated.",
    icon: <Anchor aria-hidden="true" />,
    emphasis: false,
  },
  {
    label: "04",
    title: "Vessel",
    description: "Cargo moves toward the vessel and delivery requirement.",
    icon: <Ship aria-hidden="true" />,
    emphasis: false,
  },
] as const;

/** The operating journey, with Oar's coordinating role made explicit. */
export function SupplierVesselFlow() {
  const { eyebrow, title, description, caption } = flowContent;

  return (
    <Section surface="dark" labelledBy={TITLE_ID} className="supplier-vessel-flow relative overflow-hidden">
      <div aria-hidden="true" className="bg-technical-grid absolute inset-0 opacity-50" />
      <div className="relative grid gap-10 xl:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.8fr)] xl:items-center xl:gap-16">
        <header className="max-w-xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={TITLE_ID} className="type-display mt-4 max-w-[13ch]">{title}</h2>
          <p className="type-body-lg mt-5 text-muted">{description}</p>
          <p className="type-body-sm mt-4 max-w-md text-muted">{caption}</p>
        </header>

        <div className="relative">
          <div aria-hidden="true" className="flow-connector" />
          <ol className="relative grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
            {stages.map(({ label, title: stageTitle, description: stageDescription, icon, emphasis }) => (
              <li key={label} className="flow-stage relative min-w-0">
                <div className={`flow-stage-marker${emphasis ? " flow-stage-marker--emphasis" : ""}`}>
                  <span className="[&_svg]:size-5">{icon}</span>
                </div>
                <p className="type-eyebrow mt-4 text-link">{label}</p>
                <h3 className="type-h3 mt-2 text-foreground">{stageTitle}</h3>
                <p className="type-body mt-2 text-muted">{stageDescription}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
