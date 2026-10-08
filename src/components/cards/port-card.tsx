import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLink } from "@/components/ui/arrow-link";

export interface PortCardDetail {
  label: string;
  value: string;
}

interface PortCardProps {
  title: string;
  /** Short overline such as the emirate or terminal group. */
  region?: string;
  description?: string;
  /** Optional status chip. Only use for verified information. */
  badge?: ReactNode;
  details?: readonly PortCardDetail[];
  href?: string;
  linkLabel?: string;
}

/** Label/value summary card. Works on light and dark sections. */
export function PortCard({ title, region, description, badge, details, href, linkLabel }: PortCardProps) {
  return (
    <Card as="article" padding="md" interactive={Boolean(href)} className="h-full gap-4">
      {region || badge ? (
        <div className="flex items-center justify-between gap-4">
          {region ? <span className="type-eyebrow text-link">{region}</span> : <span />}
          {badge ? <Badge tone="confirmed">{badge}</Badge> : null}
        </div>
      ) : null}
      <div>
        <h3 className="type-h3 text-foreground">{title}</h3>
        {description ? <p className="type-body mt-1 text-muted">{description}</p> : null}
      </div>
      {details?.length ? (
        <dl className="type-body flex flex-col gap-2 border-t border-border pt-4">
          {details.map((detail) => (
            <div key={detail.label} className="flex justify-between gap-4">
              <dt className="text-muted">{detail.label}</dt>
              <dd className="text-right font-semibold text-foreground">{detail.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {href && linkLabel ? (
        <div className="mt-auto pt-2">
          <ArrowLink href={href} stretched>
            {linkLabel}
            <span className="sr-only">: {title}</span>
          </ArrowLink>
        </div>
      ) : null}
    </Card>
  );
}
