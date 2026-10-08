import type { InsightBlock } from "@/types/insight";

/**
 * Renders structured insight content as semantic HTML in a comfortable
 * reading column (about 760px). Text is rendered as text, never as HTML.
 */
export function ArticleBody({ blocks }: { blocks: readonly InsightBlock[] }) {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return block.level === 3 ? (
              <h3 key={index} className="type-h3 mt-4 text-foreground">
                {block.text}
              </h3>
            ) : (
              <h2 key={index} className="type-h2 mt-8 text-foreground">
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={index} className="type-body-lg leading-7 text-foreground">
                {block.text}
              </p>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List
                key={index}
                className={`type-body-lg flex flex-col gap-2 pl-6 leading-7 text-foreground ${block.ordered ? "list-decimal" : "list-disc"}`}
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <blockquote key={index} className="border-l-2 border-link pl-6">
                <p className="type-h4 text-foreground">{block.text}</p>
                {block.attribution ? (
                  <footer className="type-body mt-2 text-muted">{block.attribution}</footer>
                ) : null}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
