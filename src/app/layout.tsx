import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { PageShell } from "@/components/layout/page-shell";
import { fontBody, fontHeading } from "@/lib/fonts";
import { rootMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071521",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteConfig.defaultLocale}
      data-scroll-behavior="smooth"
      className={`${fontBody.variable} ${fontHeading.variable}`}
    >
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
