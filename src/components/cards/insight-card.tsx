import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLink } from "@/components/ui/arrow-link";

interface InsightCardProps {
  title: string;
  excerpt: string;
  href: string;
  linkLabel: string;
  category?: string;
  /** Secondary meta such as a reading time or a date. */
  meta?: string;
  /** Top image, typically a MediaFrame with the "landscape" ratio. */
  media?: ReactNode;
}

export function InsightCard({ title, excerpt, href, linkLabel, category, meta, media }: InsightCardProps) {
  return (
    <Card as="article" padding="none" interactive className="h-full">
      {media}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        {category || meta ? (
          <div className="type-body-sm flex items-center justify-between gap-4 text-muted">
            {category ? <Badge tone="confirmed">{category}</Badge> : <span />}
            {meta ? <span>{meta}</span> : null}
          </div>
        ) : null}
        <h3 className="type-h3 text-foreground">{title}</h3>
        <p className="type-body text-muted">{excerpt}</p>
        <div className="mt-auto pt-2">
          <ArrowLink href={href} stretched>
            {linkLabel}
          </ArrowLink>
        </div>
      </div>
    </Card>
  );
}
