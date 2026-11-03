import type { Ref } from "react";

import { ButtonLink, Button } from "@/components/ui/button";
import { quotePageContent } from "@/content/quote/page";

interface QuoteConfirmationProps {
  headingRef: Ref<HTMLHeadingElement>;
  /** Click-to-chat link; the WhatsApp button is left out when there is none. */
  whatsappHref?: string;
  onReset: () => void;
}

const { confirmation } = quotePageContent;

/**
 * Result panel shown only after the server confirms delivery. Focus moves to
 * its heading so assistive technology announces it. It promises no response time.
 */
export function QuoteConfirmation({ headingRef, whatsappHref, onReset }: QuoteConfirmationProps) {
  return (
    <div role="status" className="quote-done">
      <p className="quote-done__kick">{confirmation.eyebrow}</p>
      <h2 ref={headingRef} tabIndex={-1} className="quote-done__title outline-none">
        {confirmation.title}
      </h2>
      <p className="quote-done__text">{confirmation.description}</p>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        {whatsappHref ? <ButtonLink href={whatsappHref}>{confirmation.whatsappLabel}</ButtonLink> : null}
        <Button variant="secondary" onClick={onReset}>
          {confirmation.resetLabel}
        </Button>
      </div>
    </div>
  );
}
