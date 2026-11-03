"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { contactDetails } from "@/config/contact";
import { cn } from "@/lib/utils";

/** Distance kept free at the foot of the viewport when deciding that the hero is still on screen. */
const HERO_CLEARANCE = "0px 0px -88px 0px";

/**
 * Fixed, brand-colored shortcut to Oar's verified WhatsApp contact. On phones
 * and tablets it stays out of the way while a page hero is on screen: the hero
 * has its own "WhatsApp us" button at its foot, and the round button would sit
 * on top of it.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: HERO_CLEARANCE,
    });
    observer.observe(hero);
    return () => {
      observer.disconnect();
      setOverHero(false);
    };
  }, [pathname]);

  const number = contactDetails.whatsapp?.replace(/\D/g, "");
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Oar Shipping on WhatsApp"
      className={cn(
        "fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full border border-signal-cyan/50 bg-marine-blue text-white shadow-overlay transition-[opacity,visibility,background-color] duration-200 ease-standard hover:bg-ocean focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-cyan sm:right-7 sm:bottom-7",
        overHero && "max-lg:invisible max-lg:opacity-0",
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7">
        <path
          d="M26.7 15.6a10.7 10.7 0 0 1-15.8 9.3L5 26.5l1.7-5.7a10.7 10.7 0 1 1 20-5.2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 10.7c.3-.7.6-.7 1-.7h.7c.3 0 .5.1.7.6l1 2.4c.1.3.1.5-.1.8l-.7.9c-.2.2-.3.4-.1.7.3.6 1.1 1.6 2.1 2.4 1.1.9 2 1.2 2.5 1.4.3.1.5 0 .7-.2l1-1.2c.2-.3.5-.3.8-.2l2.2 1.1c.3.2.5.3.5.5 0 .3-.2 1.6-1.1 2.2-.7.6-1.7.8-2.7.6-1-.2-2.3-.7-3.9-1.7-2.3-1.4-3.8-3.7-4.2-4.2-.4-.6-1.1-1.7-1.1-2.9s.6-2.1.8-2.5Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
