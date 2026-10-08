import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { servicesIntro } from "@/content/home/sections";

const TITLE_ID = "services-title";

export function ServicesSection() {
  const { eyebrow, title, description, cardLinkLabel, viewAll } = servicesIntro;

  return (
    <Section surface="muted" id="services" labelledBy={TITLE_ID}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleId={TITLE_ID}
        action={<ArrowLink href={viewAll.href}>{viewAll.label}</ArrowLink>}
      />
      <CapabilityGrid linkTo="detail" linkLabel={cardLinkLabel} />
    </Section>
  );
}
