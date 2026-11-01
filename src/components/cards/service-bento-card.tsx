import type { ReactNode } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { cn } from "@/lib/utils";

type BentoSize = "feature" | "standard" | "wide";

interface ServiceBentoCardProps {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  /** Zero-padded position in the list, e.g. "01". */
  index?: string;
  /** A MediaFrame with the "fill" ratio, so the image covers the whole card. */
  media: ReactNode;
  size?: BentoSize;
}

/** Full-bleed image card for the bento service grid. The title sits on the photo over a navy gradient. */
export function ServiceBentoCard({
  title,
  description,
  href,
  linkLabel,
  index,
  media,
  size = "standard",
}: ServiceBentoCardProps) {
  return (
    <article className="bento-card group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-lg bg-midnight text-white shadow-overlay has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus">
      {media}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/55 to-midnight/5" />
      <div className={cn("relative flex flex-col gap-1.5 p-4 md:gap-2 md:p-5", size === "feature" && "lg:p-8")}>
        {index ? (
          <span aria-hidden="true" className={cn("type-eyebrow text-gold", size === "standard" && "hidden md:block")}>
            {index}
          </span>
        ) : null}
        <h3 className={cn("text-white", size === "feature" ? "type-h2" : "type-h3")}>{title}</h3>
        <p
          className={cn(
            "type-body-sm max-w-[44ch] text-white/80",
            size === "feature" && "block",
            size === "wide" && "hidden sm:block",
            size === "standard" && "hidden",
          )}
        >
          {description}
        </p>
        <ArrowLink href={href} stretched className="mt-1 text-gold! hover:text-white!">
          {linkLabel}
          <span className="sr-only">: {title}</span>
        </ArrowLink>
      </div>
    </article>
  );
}
