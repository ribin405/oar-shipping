import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaFrame } from "@/components/media/media-frame";
import { ButtonLink } from "@/components/ui/button";
import { pdaTeaser } from "@/content/home/pda";

const TITLE_ID = "pda-title";

interface PdaSectionProps {
  /** Section number shown in the header. */
  index?: string;
}

/** PDA review for ship owners, given its own moment: a photograph beside the pitch and one link. */
export function PdaSection({ index }: PdaSectionProps) {
  const { eyebrow, title, description, primaryCta, image } = pdaTeaser;

  return (
    <Section labelledBy={TITLE_ID}>
      <div className="pda">
        <div className="pda__photo">
          <MediaFrame src={image.src} alt={image.alt} ratio="fill" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <div>
          <SectionHeader index={index} eyebrow={eyebrow} title={title} description={description} titleId={TITLE_ID} className="mb-6 md:mb-6" />
          <ButtonLink href={primaryCta.href} size="lg">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
