import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ContactChannelList } from "@/components/sections/contact-channels";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { OfficesSection } from "@/components/sections/offices-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SocialLinks } from "@/components/ui/social-links";
import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { contactContent } from "@/content/contact/page";
import { finalCtaContent } from "@/content/home/final-cta";
import { getContactChannels } from "@/lib/contact";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPageNode } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Contact Oar Shipping | Quotes, WhatsApp and Email" },
  description:
    "Reach Oar Shipping by WhatsApp or email for quotes, urgent after-hours port calls and PDA review across all UAE ports. Share the vessel, port and timing.",
  path: routes.contact,
});

/** Contact: the 24/7 desk, the two offices on the east-coast map, and the direct channels. */
export default function ContactPage() {
  const { hero, offices, details } = contactContent;
  const channels = getContactChannels(contactDetails);

  return (
    <>
      <JsonLd data={buildPageNode("ContactPage", routes.contact, metadata)} />
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Contact" }]} path={routes.contact} />
      <InnerPageHero {...hero} />
      <OfficesSection index="01" eyebrow={offices.eyebrow} title={offices.title} />
      {channels.length > 0 ? (
        <Section labelledBy="details-title">
          <SectionHeader index="02" eyebrow={details.eyebrow} title={details.title} titleId="details-title" />
          <ContactChannelList channels={channels} showLabels className="max-w-xl gap-5" />
          {contactDetails.social?.length ? (
            <div className="mt-10 flex max-w-xl flex-col gap-4 border-t border-border pt-8">
              <h3 className="type-label text-foreground">Follow Oar Shipping</h3>
              <p className="type-body text-muted">Port updates, vessel supply news and company news, on the channels we use.</p>
              <SocialLinks profiles={contactDetails.social} />
            </div>
          ) : null}
        </Section>
      ) : null}
      <CtaSection {...finalCtaContent} />
    </>
  );
}
