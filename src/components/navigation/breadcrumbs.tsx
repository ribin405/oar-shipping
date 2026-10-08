import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbList } from "@/lib/seo/structured-data";

export interface Crumb {
  label: string;
  /** Omit on the last crumb, which represents the current page. */
  href?: string;
}

/**
 * Lightweight breadcrumb trail. Complements, and never replaces, the primary navigation.
 * `path` is the current page's root-relative path; it lets the trail also be emitted as BreadcrumbList JSON-LD.
 */
export function Breadcrumbs({ items, path }: { items: readonly Crumb[]; path: string }) {
  const trail = items.map((item, index) => ({ label: item.label, path: item.href ?? (index === items.length - 1 ? path : "") }));

  return (
    <div className="border-b border-border bg-background">
      <JsonLd data={trail.every((crumb) => crumb.path) ? buildBreadcrumbList(trail) : undefined} />
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="type-body flex flex-wrap items-center gap-x-2">
            {items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-2">
                {index > 0 ? <ChevronRight aria-hidden="true" className="size-4 text-muted" /> : null}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="py-3 text-muted transition-colors duration-200 ease-standard hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="py-3 font-medium text-foreground">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
