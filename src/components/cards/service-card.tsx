import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { ArrowLink } from "@/components/ui/arrow-link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  /** Zero-padded position in a list, e.g. "01". */
  index?: string;
  /** Decorative lucide icon. */
  icon?: ReactNode;
  /** Optional image, typically a MediaFrame with the "standard" ratio. */
  media?: ReactNode;
}

export function ServiceCard({ title, description, href, linkLabel, index, icon, media }: ServiceCardProps) {
  return (
    <Card as="article" interactive className="h-full gap-4 hover:bg-marine-blue/5">
      {index || icon ? (
        <div className="flex items-center justify-between">
          {index ? <span className="type-h3 text-border" aria-hidden="true">{index}</span> : <span />}
          {icon ? <span className="text-link [&_svg]:size-7">{icon}</span> : null}
        </div>
      ) : null}
      <h3 className="type-h3 text-foreground">{title}</h3>
      <p className="type-body text-muted">{description}</p>
      {media ? <div className="overflow-hidden rounded-md border border-border">{media}</div> : null}
      <div className="mt-auto pt-2">
        <ArrowLink href={href} stretched>
          {linkLabel}
          <span className="sr-only">: {title}</span>
        </ArrowLink>
      </div>
    </Card>
  );
}
