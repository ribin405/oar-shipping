import type { Metadata } from "next";

import { StatusPage } from "@/components/layout/status-page";
import { ButtonLink } from "@/components/ui/button";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="Page not found"
      description="The page you are looking for does not exist or has moved."
    >
      <ButtonLink href={routes.home}>Back to homepage</ButtonLink>
    </StatusPage>
  );
}
