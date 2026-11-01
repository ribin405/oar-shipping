import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaFrame } from "@/components/media/media-frame";
import { ArrowLink } from "@/components/ui/arrow-link";
import { routes } from "@/config/routes";
import { servicesIntro } from "@/content/home/sections";
import { serviceCapabilities } from "@/content/services/capabilities";

const TITLE_ID = "divisions-title";

interface DivisionsSectionProps {
  /** Section number shown in the header. */
  index?: string;
}

/**
 * The four service divisions as photo panels. On wide, hover-capable screens
 * the hovered or focused panel widens (see `.division` in home.css); elsewhere
 * the panels stack with their text visible. Each panel is one link.
 */
export function DivisionsSection({ index }: DivisionsSectionProps) {
  const { eyebrow, title, description, cardLinkLabel, viewAll, panelImages } = servicesIntro;

  return (
    <Section id="services" labelledBy={TITLE_ID}>
      <SectionHeader
        index={index}
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleId={TITLE_ID}
        action={<ArrowLink href={viewAll.href}>{viewAll.label}</ArrowLink>}
      />
      <ul className="divisions">
        {serviceCapabilities.map(({ slug, title: serviceTitle, description: serviceDescription }, position) => (
          <li key={slug} className="division">
            <Link href={routes.service(slug)} className="division__link">
              <div className="division__photo">
                <MediaFrame
                  src={panelImages[slug]}
                  alt=""
                  ratio="fill"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
              <span aria-hidden="true" className="division__no">
                {String(position + 1).padStart(2, "0")}
              </span>
              <h3 className="division__title">{serviceTitle}</h3>
              <p className="division__text">{serviceDescription}</p>
              <span className="division__cta">
                {cardLinkLabel}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
