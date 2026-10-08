import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/sections/service-detail";
import { routes } from "@/config/routes";
import { getService, services } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Only the six known services exist; any other slug is a 404 rather than a fallback page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildPageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: routes.service(service.slug),
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
