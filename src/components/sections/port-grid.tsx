import { PortCard } from "@/components/cards/port-card";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import type { Port } from "@/types/port";

/** One card per verified port, each linking to its /ports/[slug] page. */
export function PortGrid({ ports, className }: { ports: readonly Port[]; className?: string }) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2", className)}>
      {ports.map((port) => (
        <li key={port.slug}>
          <PortCard
            title={port.name}
            region={port.region}
            description={port.summary}
            href={routes.port(port.slug)}
            linkLabel="View port"
          />
        </li>
      ))}
    </ul>
  );
}
