import { CircleCheck } from "lucide-react";
import type { Ref } from "react";

import { Button } from "@/components/ui/button";
import { quotePageContent } from "@/content/quote/page";

interface QuoteConfirmationProps {
  headingRef: Ref<HTMLHeadingElement>;
  onReset: () => void;
}

const { confirmation } = quotePageContent;

/**
 * Result panel shown only after the server confirms delivery. Focus moves to
 * its heading so assistive technology announces it.
 */
export function QuoteConfirmation({ headingRef, onReset }: QuoteConfirmationProps) {
  return (
    <div role="status" className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 md:p-8">
      <CircleCheck aria-hidden="true" className="size-8 text-link" />
      <h2 ref={headingRef} tabIndex={-1} className="type-h2 text-foreground outline-none">
        {confirmation.title}
      </h2>
      <p className="type-body-lg text-muted">{confirmation.description}</p>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button variant="secondary" onClick={onReset}>
          {confirmation.resetLabel}
        </Button>
      </div>
    </div>
  );
}
