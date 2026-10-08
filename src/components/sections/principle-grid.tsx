import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/utils";
import type { Principle } from "@/types/principle";

/** Grid of principle cards, each topped by a small route marker. Four items use four columns, other counts three. */
export function PrincipleGrid({ principles }: { principles: readonly Principle[] }) {
  return (
    <ul className={cn("grid gap-6 md:grid-cols-2", principles.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3")}>
      {principles.map(({ title, description, icon: Icon }) => (
        <li key={title} className="relative pt-6">
          <span aria-hidden="true" className="absolute top-0 left-0 h-px w-full bg-border" />
          <span aria-hidden="true" className="absolute -top-1 left-0 size-2.5 rounded-sm bg-link" />
          <Card as="article" padding="md" className="h-full gap-4">
            <IconBox>
              <Icon aria-hidden="true" />
            </IconBox>
            <h3 className="type-h3 text-foreground">{title}</h3>
            <p className="type-body text-muted">{description}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
