import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { HeaderScrollState } from "@/components/navigation/header-scroll-state";

/** Global frame: skip link, header, the single <main> landmark and footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <HeaderScrollState />
      <a
        href="#main-content"
        className="type-label sr-only rounded-md bg-midnight px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
