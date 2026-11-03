import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { OfficesMap } from "@/components/sections/offices-map";
import { contactDetails } from "@/config/contact";

const TITLE_ID = "offices-title";

interface OfficesSectionProps {
  index?: string;
  eyebrow: string;
  title: string;
}

/** The head office and the operational office: a compact east-coast map beside the two companies. Renders nothing when no offices are set. */
export function OfficesSection({ index, eyebrow, title }: OfficesSectionProps) {
  const offices = contactDetails.offices ?? [];
  if (offices.length === 0) return null;

  return (
    <Section labelledBy={TITLE_ID}>
      <SectionHeader index={index} eyebrow={eyebrow} title={title} titleId={TITLE_ID} />
      <div className="offices">
        <OfficesMap />
        <ul className="ruled">
          {offices.map(({ role, company, locality }) => (
            <li key={company}>
              <span className="offices__role">{role}</span>
              <strong>{company}</strong>
              <span>{locality}, UAE</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
