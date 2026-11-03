"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FocusEvent, type MouseEvent } from "react";

import { NavLink } from "@/components/navigation/nav-link";
import { Button, ButtonLink } from "@/components/ui/button";
import type { NavigationItem } from "@/config/navigation";

interface MobileNavigationProps {
  items: readonly NavigationItem[];
  cta: NavigationItem;
}

const DESKTOP_QUERY = "(min-width: 64rem)";

/**
 * Disclosure-style mobile menu: a button toggles a full-height panel of links.
 * Escape closes it and returns focus to the button; tabbing out of the menu,
 * choosing a link, or growing the viewport to desktop width also closes it.
 */
export function MobileNavigation({ items, cta }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    const desktop = window.matchMedia(DESKTOP_QUERY);
    function handleBreakpoint() {
      if (desktop.matches) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [open]);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }

  function handlePanelClick(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
  }

  return (
    <div className="lg:hidden" onBlur={handleBlur}>
      <Button
        ref={buttonRef}
        variant="ghost"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="-mr-1 h-9 px-3 text-sm"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        {open ? "Close" : "Menu"}
      </Button>

      <nav
        id={panelId}
        aria-label="Primary"
        hidden={!open}
        onClick={handlePanelClick}
        className="fixed inset-x-3 top-[3.75rem] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain rounded-xl border border-border bg-white/95 shadow-overlay backdrop-blur-xl md:inset-x-6"
      >
        <div className="flex w-full flex-col gap-4 p-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b border-border">
                <NavLink
                  href={item.href}
                  className="flex items-center justify-between py-2.5 text-[0.9375rem] leading-6 font-medium text-muted transition-colors duration-200 ease-standard hover:text-foreground"
                  activeClassName="text-gold-deep"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink href={cta.href} fullWidth>
            {cta.label}
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
