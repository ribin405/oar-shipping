import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { quotePageContent } from "@/content/quote/page";
import { serviceCapabilities } from "@/content/services/capabilities";
import { getWhatsAppHref } from "@/lib/contact";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Request a Quote",
  description:
    "Tell Oar about your vessel, port and requirement to get a quote for ship chandling, customs clearance, logistics, marine services or PDA review.",
  path: routes.requestQuote,
});

/** Request a Quote: a navy panel with the reasons to ask beside a six-field form; the vessel block is optional and folded. */
export default function RequestQuotePage() {
  const { panel, form } = quotePageContent;
  const serviceOptions = [
    ...serviceCapabilities.map(({ slug, title }) => ({ value: slug, label: title })),
    { value: "not-sure", label: form.notSureLabel },
  ];
  const whatsappHref = getWhatsAppHref(contactDetails);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Request a Quote" }]} path={routes.requestQuote} />

      <section aria-labelledby="quote-title" className="py-8 md:py-12">
        <Container>
          <div className="quote">
            <div className="quote__panel">
              <div>
                <p className="quote__kick">{panel.eyebrow}</p>
                <h1 id="quote-title" className="quote__title">
                  {panel.title}
                </h1>
              </div>
              <ul className="quote__reasons">
                {panel.reasons.map(({ title, text }) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              {whatsappHref && contactDetails.whatsapp ? (
                <p className="quote__wa">
                  {panel.whatsappLead} <a href={whatsappHref}>WhatsApp {contactDetails.whatsapp}</a>
                </p>
              ) : null}
            </div>
            <div className="quote__form">
              <QuoteForm serviceOptions={serviceOptions} whatsappHref={whatsappHref} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
