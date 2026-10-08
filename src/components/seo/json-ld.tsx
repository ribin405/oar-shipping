import { serializeJsonLd, type JsonLdNode } from "@/lib/seo/structured-data";

/** Server-rendered JSON-LD script. Renders nothing when there is no node (e.g. no production origin configured). */
export function JsonLd({ data }: { data: JsonLdNode | undefined }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
