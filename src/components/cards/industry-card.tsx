import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { ArrowLink } from "@/components/ui/arrow-link";

interface IndustryCardProps {
  title: string;
  description: string;
  /** Decorative lucide icon. */
  icon?: ReactNode;
  /** When provided, the whole card links to this destination. */
  href?: string;
  linkLabel?: string;
  /** Optional cover image, typically a MediaFrame with the "landscape" ratio. */
  media?: ReactNode;
}

export function IndustryCard({ title, description, icon, href, linkLabel, media }: IndustryCardProps) {
  return (
    <Card as="article" padding="md" interactive={Boolean(href)} className="h-full gap-3">
      {media ? <div className="overflow-hidden rounded-md border border-border">{media}</div> : null}
      {icon ? <IconBox>{icon}</IconBox> : null}
      <h3 className="type-h3 text-foreground">{title}</h3>
      <p className="type-body text-muted">{description}</p>
      {href && linkLabel ? (
        <div className="mt-auto pt-2">
          <ArrowLink href={href} stretched>
            {linkLabel}
          </ArrowLink>
        </div>
      ) : null}
    </Card>
  );
}
