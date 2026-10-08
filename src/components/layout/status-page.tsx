import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface StatusPageProps {
  code?: string;
  title: string;
  description: string;
  children?: ReactNode;
}

/** Shared shell for error, not-found and other full-page status messages. */
export function StatusPage({ code, title, description, children }: StatusPageProps) {
  return (
    <Container as="section" className="flex min-h-[60dvh] flex-col justify-center py-20">
      {code ? <Eyebrow className="mb-4">{code}</Eyebrow> : null}
      <h1 className="type-h1 text-foreground max-w-2xl">{title}</h1>
      <p className="type-body-lg text-muted mt-4 max-w-xl">{description}</p>
      {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
    </Container>
  );
}
