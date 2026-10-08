import { MediaFrame } from "@/components/media/media-frame";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { PortGrid } from "@/components/sections/port-grid";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { portsContent } from "@/content/home/ports";
import { ports } from "@/content/ports";

const TITLE_ID = "ports-title";

export function PortsSection() {
  const { eyebrow, title, description, visualEyebrow, visualText, cta } = portsContent;

  return (
    <Section
      surface="dark-elevated"
      labelledBy={TITLE_ID}
      className={ports.length === 0 ? "relative isolate overflow-hidden" : undefined}
    >
      {ports.length === 0 ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
          <MediaFrame
            src="/images/ports/uae-coast-satellite.jpg"
            alt=""
            ratio="fill"
            position="object-[50%_45%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/70 to-midnight/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-midnight/40" />
          <p className="absolute right-6 bottom-4 text-xs text-white/70">Image courtesy NASA/JSC</p>
        </div>
      ) : null}

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-8">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleId={TITLE_ID}
            className="mb-0 md:mb-0"
          />
          <ButtonLink href={cta.href} size="lg">
            {cta.label}
          </ButtonLink>
        </div>

        {ports.length > 0 ? (
          <PortGrid ports={ports} />
        ) : (
          <figure className="relative overflow-hidden rounded-lg border border-border lg:hidden">
            <MediaFrame
              src="/images/ports/uae-coast-satellite.jpg"
              alt="Satellite view of the UAE coastline along the Persian Gulf, taken from the International Space Station"
              ratio="standard"
              overlay="scrim"
              position="object-[50%_45%]"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-midnight via-midnight/85 to-transparent p-6 pt-16 md:p-8 md:pt-20">
              <Eyebrow>{visualEyebrow}</Eyebrow>
              <p className="type-body-lg text-foreground">{visualText}</p>
              <p className="text-xs text-muted">Image courtesy NASA/JSC</p>
            </figcaption>
          </figure>
        )}
      </div>
    </Section>
  );
}
