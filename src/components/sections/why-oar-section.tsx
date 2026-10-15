import type { CSSProperties } from "react";
import { Check } from "lucide-react";

import { Section } from "@/components/layout/section";
import { MediaFrame } from "@/components/media/media-frame";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PlayOnView } from "@/components/ui/play-on-view";
import { whyOarContent } from "@/content/home/why-oar";

const TITLE_ID = "why-oar-title";

export function WhyOarSection() {
  const { eyebrow, description, action } = whyOarContent;
  const supportingPoints = [
    "Connect suppliers, cargo, transport and port-side activity.",
    "Work with an understanding of the UAE maritime environment.",
    "Shape execution around the requirement and its timing.",
  ];
  const operationalPoints = [
    "Suppliers, cargo, transport and port-side activity brought into one flow.",
    "Documentation and customs requirements coordinated alongside cargo movement.",
    "Each movement shaped by the cargo, port and vessel operation involved.",
  ];

  return (
    <Section surface="muted" className="why-oar-section">
      <PlayOnView className="why-oar-motion">
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-14">
          <article aria-labelledby={TITLE_ID} className="flex min-w-0 flex-col">
            <header className="flex max-w-2xl flex-col items-start gap-4">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 id={TITLE_ID} className="type-h1 max-w-[16ch]">
                More Than Logistics. It&apos;s Coordination.
              </h2>
              <p className="type-body-lg text-muted">{description}</p>
            </header>

            <ul className="mt-6 grid gap-3" aria-label="How Oar coordinates port-side requirements">
              {supportingPoints.map((point, index) => (
                <li
                  key={point}
                  className="why-oar-principle flex items-start gap-3"
                  style={{ "--why-index": index } as CSSProperties}
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-signal-cyan/20 text-marine-blue">
                    <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="type-body text-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <ArrowLink href={action.href} className="mt-5 self-start">{action.label}</ArrowLink>

            <MediaFrame
              src="/images/hero/ship 1.jpg"
              alt="A container ship underway near a port terminal in hazy light."
              ratio="landscape"
              position="object-center"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="mt-8 rounded-lg shadow-panel lg:mt-auto lg:pt-8"
            />
          </article>

          <article aria-labelledby="operational-control-title" className="flex min-w-0 flex-col">
            <header className="flex max-w-2xl flex-col items-start gap-4">
              <Eyebrow>Operational control</Eyebrow>
              <h2 id="operational-control-title" className="type-h1 max-w-[16ch]">
                Built around operational control.
              </h2>
              <p className="type-body-lg text-muted">
                Oar&apos;s role is to coordinate the shore-side details that keep vessel-related logistics moving, with clear communication and controlled execution from supplier to vessel.
              </p>
            </header>

            <ul className="mt-6 grid gap-3" aria-label="Oar's operational approach">
              {operationalPoints.map((point, index) => (
                <li
                  key={point}
                  className="why-oar-principle flex items-start gap-3"
                  style={{ "--why-index": index + supportingPoints.length } as CSSProperties}
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-signal-cyan/20 text-marine-blue">
                    <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="type-body text-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <MediaFrame
              src="/images/services/port-coordination.jpg"
              alt="Aerial view of container rows and a road through a port terminal."
              ratio="landscape"
              position="object-center"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="mt-8 rounded-lg shadow-panel lg:mt-auto lg:pt-8"
            />
          </article>
        </div>
      </PlayOnView>
    </Section>
  );
}
