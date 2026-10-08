import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { CheckList } from "@/components/ui/check-list";
import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { quotePageContent } from "@/content/quote/page";
import { serviceCapabilities } from "@/content/services/capabilities";
import { getContactChannels } from "@/lib/contact";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Request a Marine Logistics Quote",
  description:
    "Tell Oar about your requirement: the service you need, cargo, pickup location, delivery port, vessel and timing.",
  path: routes.requestQuote,
});

export default function RequestQuotePage() {
  const { hero, aside, cta } = quotePageContent;
  // Only offer "Contact Oar" once the Contact page has verified channels to show.
  const hasContactChannels = getContactChannels(contactDetails).length > 0;
  const serviceOptions = serviceCapabilities.map(({ slug, title }) => ({ value: slug, label: title }));

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Request a Quote" }]} path={routes.requestQuote} />
      <InnerPageHero {...hero} />

      <Section labelledBy="rfq-title">
        <h2 id="rfq-title" className="sr-only">
          Quote request form
        </h2>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <QuoteForm serviceOptions={serviceOptions} />
          </div>
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 md:p-8 lg:col-span-4">
            <h2 id="share-title" className="type-h3 text-foreground">
              {aside.title}
            </h2>
            <p className="type-body text-muted">{aside.description}</p>
            <CheckList items={aside.items} className="gap-3 text-foreground" />
          </div>
        </div>
      </Section>

      <ProcessSection />
      {hasContactChannels ? <CtaSection {...cta} /> : null}
    </>
  );
}
