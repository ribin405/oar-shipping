import { Section } from "@/components/layout/section";
import { CheckList } from "@/components/ui/check-list";
import type { PolicySection } from "@/content/legal/privacy";

interface PolicyDocumentProps {
  summary: { title: string; points: readonly string[] };
  sections: readonly PolicySection[];
}

/**
 * A long-form legal page: a short summary card, a sticky "On this page" index
 * and numbered sections that can be linked to directly. Text is rendered as
 * text, never as HTML.
 */
export function PolicyDocument({ summary, sections }: PolicyDocumentProps) {
  return (
    <Section spacing="compact">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <nav aria-label="On this page" className="lg:sticky lg:top-28">
            <p className="type-eyebrow text-link">On this page</p>
            <ol className="mt-4 flex flex-col border-l border-border">
              {sections.map(({ id, title }, index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="type-body -ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-muted transition-colors duration-200 ease-standard hover:border-primary hover:text-foreground"
                  >
                    <span aria-hidden="true" className="w-6 shrink-0 tabular-nums text-link">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="flex max-w-3xl flex-col gap-12 lg:col-span-8 xl:col-span-9">
          <aside aria-labelledby="policy-summary-title" className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 id="policy-summary-title" className="type-h3 text-foreground">
              {summary.title}
            </h2>
            <CheckList items={summary.points} className="mt-4" />
          </aside>

          {sections.map(({ id, title, body }, index) => (
            <section key={id} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
              <p className="type-eyebrow text-link tabular-nums">{String(index + 1).padStart(2, "0")}</p>
              <h2 id={`${id}-title`} className="type-h2 mt-2 text-foreground">
                {title}
              </h2>
              <div className="mt-5 flex flex-col gap-5">
                {body.map((block, blockIndex) =>
                  block.type === "paragraph" ? (
                    <p key={blockIndex} className="type-body-lg leading-7 text-foreground">
                      {block.text}
                    </p>
                  ) : (
                    <ul key={blockIndex} className="type-body-lg flex list-disc flex-col gap-2.5 pl-6 leading-7 text-foreground marker:text-link">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
