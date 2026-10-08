import { ArrowDown, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import { cn } from "@/lib/utils";

export interface RouteFlowStep {
  /** Short stage marker, e.g. "01". */
  label: string;
  title: string;
  description: string;
  icon?: ReactNode;
  /** Short activities listed inside the step. */
  items?: readonly string[];
  /** Emphasises the central step of the flow. */
  highlighted?: boolean;
}

/** Breakpoint at which the flow switches from vertical to horizontal. */
type FlowLayout = "lg" | "xl";

/** Class names are written out in full so Tailwind can detect them. */
const layoutStyles: Record<
  FlowLayout,
  { list: string; grow: string; growHighlighted: string; connector: string; line: string; down: string; right: string }
> = {
  lg: {
    list: "lg:flex-row lg:gap-16",
    grow: "lg:flex-1",
    growHighlighted: "lg:flex-[1.3]",
    connector: "lg:top-1/2 lg:left-full lg:h-8 lg:w-16 lg:translate-x-0 lg:-translate-y-1/2",
    line: "lg:h-0.5 lg:w-full",
    down: "lg:hidden",
    right: "hidden lg:block",
  },
  xl: {
    list: "xl:flex-row xl:gap-10",
    grow: "xl:flex-1",
    growHighlighted: "xl:flex-[1.3]",
    connector: "xl:top-1/2 xl:left-full xl:h-8 xl:w-10 xl:translate-x-0 xl:-translate-y-1/2",
    line: "xl:h-0.5 xl:w-full",
    down: "xl:hidden",
    right: "hidden xl:block",
  },
};

interface RouteFlowProps {
  steps: readonly RouteFlowStep[];
  /** Use "xl" for flows with many steps that need more width before going horizontal. */
  layout?: FlowLayout;
  className?: string;
}

/**
 * Ordered, directional flow of steps. Stacks vertically with downward
 * connectors on mobile and runs left to right with arrows once the layout
 * breakpoint is reached. Content-agnostic: callers supply the steps.
 */
export function RouteFlow({ steps, layout = "lg", className }: RouteFlowProps) {
  const styles = layoutStyles[layout];

  return (
    <ol className={cn("flex flex-col gap-12", styles.list, className)}>
      {steps.map((step, index) => (
        <li key={step.title} className={cn("relative flex", step.highlighted ? styles.growHighlighted : styles.grow)}>
          <Card as="div" padding="md" className={cn("w-full gap-4", step.highlighted && "border-link bg-primary/25 lg:py-8")}>
            <div className="flex items-center justify-between gap-4">
              <span className="type-eyebrow text-link">{step.label}</span>
              {step.icon ? <span className="text-link [&_svg]:size-5">{step.icon}</span> : null}
            </div>
            <h3 className={cn("text-foreground", layout === "xl" ? "type-h4" : "type-h3")}>{step.title}</h3>
            <p className={cn("type-body", step.highlighted ? "text-foreground" : "text-muted")}>{step.description}</p>
            {step.items ? <CheckList items={step.items} className="border-t border-border pt-4" /> : null}
          </Card>
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-full left-1/2 flex h-12 w-8 -translate-x-1/2 items-center justify-center text-link",
                styles.connector,
              )}
            >
              <span className={cn("absolute h-full w-0.5 bg-border", styles.line)} />
              <span className="relative bg-background p-1">
                <ArrowDown className={cn("size-5", styles.down)} />
                <ArrowRight className={cn("size-5", styles.right)} />
              </span>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
