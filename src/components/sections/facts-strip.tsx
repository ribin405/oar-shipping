import { Container } from "@/components/layout/container";
import { homeFacts } from "@/content/home/facts";

/** Four plain facts between two hairlines, directly under the hero. */
export function FactsStrip() {
  return (
    <section aria-label="At a glance" className="pt-8 md:pt-10">
      <Container>
        <dl className="facts">
          {homeFacts.map(({ value, label }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
