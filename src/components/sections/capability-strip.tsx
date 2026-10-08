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
    <div data-surface="dark" role="region" aria-labelledby="capabilities-title" className="relative pb-8 md:pb-12">
      <Container>
      <h2 id="capabilities-title" className="sr-only">
        Oar service capabilities
      </h2>
      <ul className="grid grid-cols-2 overflow-hidden rounded-lg border border-border sm:grid-cols-3 lg:grid-cols-6">
        {serviceCapabilities.map(({ slug, title, icon: Icon }) => (
          <li key={slug} className="bg-midnight/30 ring-1 ring-border ring-inset">
            <Link
              href={routes.service(slug)}
              className="group flex h-full flex-col gap-4 p-4 transition-colors duration-200 ease-standard hover:bg-primary/80 -outline-offset-2 md:p-5"
            >
              <span className="flex items-center justify-between text-link">
                <Icon aria-hidden="true" className="size-6" />
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 opacity-0 transition-opacity duration-200 ease-standard group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </span>
              <span className="type-h4 text-foreground">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
      </Container>
    </div>
  );
}
