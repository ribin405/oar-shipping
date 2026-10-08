import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconBox } from "@/components/ui/icon-box";
import { trustContent, trustPoints } from "@/content/home/trust";

const TITLE_ID = "trust-title";

/** Editorial trust section: no credentials, partners, clients or statistics until verified. */
export function TrustSection() {
  const { eyebrow, title, description } = trustContent;

  return (
    <Section surface="dark" labelledBy={TITLE_ID} className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-technical-grid absolute inset-0 opacity-40" />
      <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={TITLE_ID} className="type-display">
            {title}
          </h2>
          <p className="type-body-lg max-w-xl text-muted">{description}</p>
        </div>
        <ul className="flex flex-col gap-6 self-center">
          {trustPoints.map(({ title: point, description: summary, icon: Icon }) => (
            <li key={point} className="flex gap-4 border-t border-border pt-6">
              <IconBox>
                <Icon aria-hidden="true" />
              </IconBox>
              <div className="flex flex-col gap-1">
                <h3 className="type-h4 text-foreground">{point}</h3>
                <p className="type-body text-muted">{summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
