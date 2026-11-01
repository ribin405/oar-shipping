import type { ReactNode } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  /** Decorative lucide icon. */
  icon?: ReactNode;
  /** Optional cover image, typically a MediaFrame with the "standard" ratio. */
  media?: ReactNode;
}

/** Compact service card with a cover image, used where services are listed outside the bento grid. */
export function ServiceCard({ title, description, href, linkLabel, icon, media }: ServiceCardProps) {
  return (
    <Card as="article" interactive className="h-full gap-4">
      {icon ? <span className="self-end text-link [&_svg]:size-7">{icon}</span> : null}
      {media ? <div className="overflow-hidden rounded-md border border-border">{media}</div> : null}
      <h3 className="type-h3 text-foreground">{title}</h3>
      <p className="type-body text-muted">{description}</p>
      <div className="mt-auto pt-2">
        <ArrowLink href={href} stretched>
          {linkLabel}
          <span className="sr-only">: {title}</span>
        </ArrowLink>
      </div>
    </Card>
  );
}
