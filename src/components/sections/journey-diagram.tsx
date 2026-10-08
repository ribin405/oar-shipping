import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export interface JourneyNode {
  label: string;
  description?: string;
}

interface JourneyDiagramProps {
  /** What Oar does across the whole journey; shown in the band above the nodes. */
  heading: string;
  nodes: readonly JourneyNode[];
  /** "vertical" stacks the nodes at every width; "responsive" is vertical until `lg`, then a single row. */
  orientation?: "vertical" | "responsive";
}

/**
 * Ordered journey with one Oar band spanning all of it, so Oar reads as
 * coordinating the whole path rather than owning each party. Markers and
 * lines are decorative; the ordered list carries the sequence.
 */
export function JourneyDiagram({ heading, nodes, orientation = "vertical" }: JourneyDiagramProps) {
  const row = orientation === "responsive";

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border bg-primary/15 px-6 py-4">
        <Eyebrow>Oar</Eyebrow>
        <p className="type-body text-foreground">{heading}</p>
      </div>
      <ol className={cn("flex flex-col p-6", row && "lg:grid lg:grid-cols-6")}>
        {nodes.map((node, index) => (
          <li key={node.label} className={cn("flex gap-4 not-last:pb-6", row && "lg:flex-col lg:gap-3 lg:pr-4 lg:pb-0")}>
            <span aria-hidden="true" className={cn("flex flex-col items-center", row && "lg:w-full lg:flex-row")}>
              <span className="mt-1.5 size-3 shrink-0 rounded-sm bg-link lg:mt-0" />
              {index < nodes.length - 1 ? (
                <span className={cn("w-px flex-1 bg-link/40", row && "lg:h-px lg:w-auto")} />
              ) : null}
            </span>
            <div className="flex flex-col gap-1">
              <p className="type-h4 text-foreground">{node.label}</p>
              {node.description ? <p className="type-body text-muted">{node.description}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
