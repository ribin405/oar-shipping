"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface PlayOnViewProps {
  className?: string;
  children: ReactNode;
}

/**
 * Wrapper that starts CSS entrance animations (see `mp-*` rules in globals.css)
 * the first time it scrolls into view. Without JavaScript, or when the visitor
 * prefers reduced motion, nothing is hidden and nothing animates: the content
 * is complete at rest. Content below the fold is hidden only until it plays.
 */
export function PlayOnView({ className, children }: PlayOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      el.dataset.mp = "play";
      return;
    }

    el.dataset.mp = "armed";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // A quarter of the element, or a fifth of the viewport for tall stacked grids on phones,
        // where a quarter of the element can exceed the whole viewport and would never be reached.
        const viewport = entry.rootBounds?.height ?? window.innerHeight;
        if (entry.intersectionRatio < 0.25 && entry.intersectionRect.height < viewport * 0.2) return;
        el.dataset.mp = "play";
        observer.disconnect();
      },
      { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
