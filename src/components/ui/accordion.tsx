import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Disclosure list built on native <details>/<summary>: keyboard operable
 * (Enter and Space), exposes its expanded state to assistive technology, needs
 * no JavaScript, and keeps answers in the HTML for crawlers.
 */
export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="type-h4 flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-foreground transition-colors duration-200 ease-standard hover:bg-foreground/5 focus-visible:-outline-offset-2 [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-link transition-transform duration-200 ease-standard group-open:rotate-180"
            />
          </summary>
          <p className="type-body-lg px-6 pb-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
