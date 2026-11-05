import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CtaSection } from "@/components/sections/cta-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { PolicyDocument } from "@/components/sections/policy-document";
import { JsonLd } from "@/components/seo/json-ld";
import { routes } from "@/config/routes";
import { finalCtaContent } from "@/content/home/final-cta";
import { privacyContent } from "@/content/legal/privacy";
import { formatDate } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPageNode } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Oar Shipping collects, uses and protects personal information when you visit our website, request a quote or contact our UAE marine services team.",
  path: routes.privacy,
});

/** Privacy Policy: a summary, an index and numbered sections describing what the site actually does with personal data. */
export default function PrivacyPolicyPage() {
  const { hero, summary, sections, updatedAt } = privacyContent;

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Privacy Policy" }]} path={routes.privacy} />
      <JsonLd data={buildPageNode("WebPage", routes.privacy, metadata)} />
      <InnerPageHero
        {...hero}
        compactTitle
        meta={
          <p className="type-body text-muted">
            Last updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
          </p>
        }
      />
      <PolicyDocument summary={summary} sections={sections} />
      <CtaSection {...finalCtaContent} />
    </>
  );
}
