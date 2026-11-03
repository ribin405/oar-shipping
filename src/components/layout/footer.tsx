import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { ContactChannelList } from "@/components/sections/contact-channels";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { footerCompanyLinks, footerLegalLinks, footerServiceLinks } from "@/config/footer";
import { navigationCta, type NavigationItem } from "@/config/navigation";
import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { getContactChannels } from "@/lib/contact";
import { siteConfig } from "@/lib/site-config";

const linkStyles = "transition-colors duration-200 ease-standard hover:text-foreground";

function LinkColumn({ title, links }: { title: string; links: readonly NavigationItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="type-eyebrow text-link">{title}</h2>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`type-body inline-block py-2 text-muted ${linkStyles}`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const channels = getContactChannels(contactDetails);

  return (
    <footer className="site-footer text-foreground">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-4">
            <Logo />
            <p className="type-body-lg max-w-sm text-muted">
              Ship chandling, customs, logistics and marine services across all UAE ports, with one point of contact.
            </p>
            <ButtonLink href={navigationCta.href} className="self-start">
              {navigationCta.label}
            </ButtonLink>
          </div>

          <nav aria-label="Footer" className="grid gap-12 sm:grid-cols-2 md:col-span-2 lg:col-span-5">
            <LinkColumn title="Services" links={footerServiceLinks} />
            <LinkColumn title="Company" links={footerCompanyLinks} />
          </nav>

          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-3">
            {contactDetails.offices?.length ? (
              <>
                <h2 className="type-eyebrow text-link">Offices</h2>
                <dl className="grid gap-3">
                  {contactDetails.offices.map(({ role, company, locality }) => (
                    <div key={company}>
                      <dt className="type-body-sm text-muted">{role}</dt>
                      <dd className="type-body font-medium">
                        {company}
                        <span className="block font-normal text-muted">{locality}, UAE</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}
            <h2 className="type-eyebrow text-link mt-2">Connect</h2>
            <ContactChannelList channels={channels} />
            <ArrowLink href={routes.contact} className="py-2">
              Contact Oar
            </ArrowLink>
          </div>
        </div>

        <div className="type-body-sm mt-12 flex flex-col gap-4 border-t border-border pt-6 text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          {footerLegalLinks.length > 0 ? (
            <nav aria-label="Legal">
              <ul className="flex gap-6">
                {footerLegalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkStyles}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
