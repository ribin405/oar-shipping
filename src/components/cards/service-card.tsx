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
  /** Render the image as a full-card visual with a focused hover treatment. */
  featuredImage?: boolean;
  /** Add the Oar navy-to-marine gradient over the image. */
  navyGradient?: boolean;
  /** Show the reference card layout at rest and the full-image treatment on hover. */
  referenceLayout?: boolean;
}

export function ServiceCard({
  title,
  description,
  href,
  linkLabel,
  index,
  icon,
  media,
  featuredImage = false,
  navyGradient = false,
  referenceLayout = false,
}: ServiceCardProps) {
  return (
    <Card
      as="article"
      interactive
      className={`h-full gap-4 hover:bg-marine-blue/5${featuredImage ? " service-card--featured-image" : ""}${navyGradient ? " service-card--port-logistics" : ""}${referenceLayout ? " service-card--reference-layout" : ""}`}
    >
      {featuredImage && media && !referenceLayout ? <div className="service-card__backdrop">{media}</div> : null}
      {referenceLayout && media ? <div aria-hidden="true" className="service-card__backdrop service-card__hover-backdrop">{media}</div> : null}
      {index || icon ? (
        <div className="service-card__top flex items-center justify-between">
          {index ? <span className="type-h3 text-border" aria-hidden="true">{index}</span> : <span />}
          {icon ? <span className="text-link [&_svg]:size-7">{icon}</span> : null}
        </div>
      ) : null}
      <div className={featuredImage ? "service-card__copy service-card__copy--featured" : "service-card__copy"}>
        <h3 className="service-card__title type-h3 text-foreground">{title}</h3>
        <p className="service-card__description type-body text-muted">{description}</p>
      </div>
      {media ? (
        featuredImage && !referenceLayout ? <div aria-hidden="true" className="service-card__image-space" /> :
          <div className="service-card__media overflow-hidden rounded-md border border-border">{media}</div>
      ) : null}
      <div className="service-card__action mt-auto pt-2">
        <ArrowLink href={href} stretched>
          {linkLabel}
          <span className="sr-only">: {title}</span>
        </ArrowLink>
      </div>
    </Card>
  );
}
