"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface Point {
  title: string;
  text: string;
}

export interface WhyOarGroup {
  title: string;
  intro?: string;
  points: readonly Point[];
}

/**
 * The Why Oar groups. From 1024px they are three open columns. Below that each
 * group is an accordion row (serif name, gold number, ring chevron): one open
 * at a time, the first open to begin with. The rows are only collapsed once
 * the page has hydrated, so without JavaScript every group stays open, and the
 * text of a collapsed group is still in the page for search engines.
 */
export function WhyOarGroups({ groups }: { groups: readonly WhyOarGroup[] }) {
  const [enhanced, setEnhanced] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  useEffect(() => {
    // Collapsing is a client-only enhancement, switched on after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnhanced(true);
  }, []);

  // Index of each group's first point, so the entrance stagger runs across all three groups.
  const starts = groups.map((_, index) => groups.slice(0, index).reduce((count, group) => count + group.points.length, 0));

  return (
    <div className="why-grid" data-enhanced={enhanced || undefined}>
      {groups.map((group, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const start = starts[index];

        return (
          <div key={group.title} className={cn("why-col", open && "why-col--open")}>
            <h3 className="why-col__title hidden lg:block">{group.title}</h3>
            <h3 className="why-col__row lg:hidden">
              <button
                type="button"
                className="why-col__toggle"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span aria-hidden="true" className="why-col__no">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="why-col__name">{group.title}</span>
                <span aria-hidden="true" className="why-col__chev">
                  <ChevronDown />
                </span>
              </button>
            </h3>
            <div id={panelId} className="why-col__panel">
              <div className="why-col__inner">
                {group.intro ? <p className="why-col__intro">{group.intro}</p> : null}
                <ul className="ruled">
                  {group.points.map(({ title, text }, pointIndex) => (
                    <li key={title} style={{ "--i": start + pointIndex } as CSSProperties} className="reveal reveal-up">
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
