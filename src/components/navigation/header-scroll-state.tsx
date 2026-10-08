"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `data-scrolled` on <html> when the page leaves the top, so the header
 * can switch between its transparent (overlay) and solid looks with CSS only.
 * Renders a 1px sentinel at the top of the document; no state, no re-renders.
 */
export function HeaderScrollState() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      document.documentElement.dataset.scrolled = String(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-4 w-px" />;
}
