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
        className="-mr-2"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        {open ? "Close" : "Menu"}
      </Button>

      <nav
        id={panelId}
        aria-label="Primary"
        hidden={!open}
        data-surface="dark"
        onClick={handlePanelClick}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain bg-background"
      >
        <div className="mx-auto flex w-full max-w-content flex-col gap-8 px-4 py-8 md:px-6">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b border-border">
                <NavLink
                  href={item.href}
                  className="type-h3 flex items-center justify-between py-4 text-muted transition-colors duration-200 ease-standard hover:text-foreground"
                  activeClassName="text-link"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink href={cta.href} size="lg" fullWidth>
            {cta.label}
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
