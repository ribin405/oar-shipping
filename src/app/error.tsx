"use client";

import { StatusPage } from "@/components/layout/status-page";
import { Button, ButtonLink } from "@/components/ui/button";
import { routes } from "@/config/routes";

export default function Error({ retry }: { retry: () => void }) {
  return (
    <StatusPage
      title="Something went wrong"
      description="We could not load this page. Please try again, or return to the homepage."
    >
      <Button onClick={() => retry()}>Try again</Button>
      <ButtonLink href={routes.home} variant="secondary">
        Back to homepage
      </ButtonLink>
    </StatusPage>
  );
}
