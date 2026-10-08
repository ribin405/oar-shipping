import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortDetail } from "@/components/sections/port-detail";
import { routes } from "@/config/routes";
import { getPort, ports } from "@/content/ports";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PortPageProps {
  params: Promise<{ slug: string }>;
}

/** Only verified entries in the port collection have pages; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return ports.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PortPageProps): Promise<Metadata> {
  const { slug } = await params;
  const port = getPort(slug);
  if (!port) return {};

  return buildPageMetadata({ title: port.name, description: port.summary, path: routes.port(port.slug) });
}

export default async function PortPage({ params }: PortPageProps) {
  const { slug } = await params;
  const port = getPort(slug);
  if (!port) notFound();

  return <PortDetail port={port} />;
}
