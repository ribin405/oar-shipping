import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { routes } from "@/config/routes";
import { serviceCapabilities } from "@/content/services/capabilities";

/**
 * One-line summary of Oar's service scope, linking to each service page.
 * Rendered inside the hero so the hero photograph continues behind it.
 */
export function CapabilityStrip() {
  return (
    <div data-surface="dark" role="region" aria-labelledby="capabilities-title" className="relative pb-6 sm:pb-8 md:pb-12">
      <Container>
      <h2 id="capabilities-title" className="sr-only">
        Oar service capabilities
      </h2>
      <ul className="capability-rail grid grid-cols-2 overflow-hidden border-y border-border sm:grid-cols-3 lg:grid-cols-6">
        {serviceCapabilities.map(({ slug, title, icon: Icon }) => (
          <li key={slug} className="capability-rail__item">
            <Link
              href={routes.service(slug)}
              className="group flex h-full min-h-16 items-center justify-between gap-2 px-3 py-2 transition-colors duration-200 ease-standard hover:bg-white/10 -outline-offset-2 sm:min-h-14 sm:gap-3 sm:px-3 sm:py-3"
            >
              <span className="flex min-w-0 flex-col items-start gap-1 text-link sm:flex-row sm:items-center sm:gap-2">
                <Icon aria-hidden="true" className="size-5 shrink-0" />
                <span className="type-label text-foreground">{title}</span>
              </span>
              <span className="hidden shrink-0 text-link sm:block">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 opacity-50 transition-[opacity,transform] duration-200 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      </Container>
    </div>
  );
}
