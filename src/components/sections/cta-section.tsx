import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { contactDetails } from "@/config/contact";
import { getWhatsAppHref } from "@/lib/contact";

interface CtaLink {
  label: string;
  href: string;
}

interface CtaSectionProps {
  /** Unique heading id, in case a page ever holds more than one. */
  id?: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

const { email, whatsapp } = contactDetails;

/** Each way to reach Oar, shown only when it is set in config/contact.ts. */
const contactRows = [
  { label: "Email", value: email, href: email && `mailto:${email}` },
  { label: "WhatsApp", value: whatsapp, href: getWhatsAppHref({ whatsapp }) },
].filter((row): row is { label: string; value: string; href: string | undefined } => Boolean(row.value));

/** The closing band: one call to action and every confirmed way to reach Oar. Used at the foot of every page. */
export function CtaSection({ id = "cta", title, description, primaryCta, secondaryCta }: CtaSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section aria-labelledby={titleId} className="closing">
      <Container>
        <div className="closing__inner">
          <div>
            <h2 id={titleId} className="closing__title type-title">
              {title}
            </h2>
            <p className="closing__text">{description}</p>
            <div className="closing__actions">
              <Link href={primaryCta.href} className="btn-light">
                {primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Link>
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="link-light">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
          {contactRows.length > 0 ? (
            <dl className="closing__contacts">
              {contactRows.map(({ label, value, href }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{href ? <a href={href}>{value}</a> : value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
