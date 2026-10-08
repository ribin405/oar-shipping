import { Anchor, Package, Ship } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { RouteFlow, type RouteFlowStep } from "@/components/ui/route-flow";
import { flowContent } from "@/content/home/flow";

const TITLE_ID = "flow-title";

const steps: readonly RouteFlowStep[] = [
  { ...flowContent.supplier, icon: <Package aria-hidden="true" /> },
  { ...flowContent.oar, items: flowContent.oar.activities, icon: <Anchor aria-hidden="true" />, highlighted: true },
  { ...flowContent.vessel, icon: <Ship aria-hidden="true" /> },
];

/** Signature visual: Supplier Door, Oar Coordination & Execution, Vessel Deck. */
export function SupplierVesselFlow() {
  const { eyebrow, title, description, caption } = flowContent;

  return (
    <Section surface="dark" labelledBy={TITLE_ID} className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-technical-grid absolute inset-0 opacity-50" />
      <div className="relative">
        <SectionHeader align="center" eyebrow={eyebrow} title={title} description={description} titleId={TITLE_ID} />
        <RouteFlow steps={steps} className="lg:items-center" />
        <p className="type-body-sm mx-auto mt-12 max-w-xl text-center text-muted">{caption}</p>
      </div>
    </Section>
  );
}
