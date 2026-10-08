"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface PlayOnViewProps {
  className?: string;
  surface?: string;
  children: ReactNode;
}

/**
 * Wrapper that starts CSS entrance animations (see `mp-*` rules in globals.css)
 * the first time it scrolls into view. Without JavaScript, or when the visitor
 * prefers reduced motion, nothing is hidden and nothing animates: the content
 * is complete at rest. Content below the fold is hidden only until it plays.
 */
export function PlayOnView({ className, surface, children }: PlayOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      el.dataset.mp = "play";
      return;
    }

    el.dataset.mp = "armed";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.mp = "play";
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-surface={surface} className={className}>
      {children}
    </div>
  );
}
