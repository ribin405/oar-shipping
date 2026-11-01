import { contactDetails } from "@/config/contact";
import { routes } from "@/config/routes";
import { heroContent } from "@/content/home/hero";
import { portCallContent } from "@/content/home/port-call";
import { coveragePorts, otherPortsLabel } from "@/content/ports/coverage";
import { serviceCapabilities } from "@/content/services/capabilities";
import { absoluteUrl } from "@/lib/seo/url";
import { getWhatsAppHref } from "@/lib/contact";
import { lowerFirst } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

/** Absolute URL when an origin is configured, otherwise the root-relative path. */
const link = (path: string): string => absoluteUrl(path) ?? path;

/**
 * /llms.txt: a plain-text, answer-first summary of the site for generative
 * engines and agents (the llms.txt convention: H1, a blockquote summary, then
 * sections of links). It is built from the same content and config as the
 * pages, so it cannot drift from what the site says, and it states only what
 * the site states.
 */
export function buildLlmsTxt(): string {
  const { departments, whatsapp } = contactDetails;
  const whatsappHref = getWhatsAppHref({ whatsapp });
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    heroContent.description,
    "",
    "## Services",
    ...serviceCapabilities.map(({ slug, title, description }) => `- [${title}](${link(routes.service(slug))}): ${description}`),
    "",
    "## Coverage",
    `- Ports: ${coveragePorts.join(", ")}, and ${lowerFirst(otherPortsLabel)}. Base: Fujairah, UAE. Operations desk: 24/7.`,
    `- [Ports & locations](${link(routes.ports)})`,
    "",
    "## How a port call runs",
    ...portCallContent.stages.map(({ label, title, description }) => `- ${label} ${title}: ${description}`),
    "",
    "## Company",
    `- [About](${link(routes.about)})`,
    `- [Why Oar](${link(routes.whyOar)})`,
    `- [Industries served](${link(routes.industries)})`,
    "",
    "## Contact",
    `- [Request a quote](${link(routes.requestQuote)})`,
    `- [Contact page](${link(routes.contact)})`,
    ...(contactDetails.email ? [`- General: ${contactDetails.email}`] : []),
    ...(departments?.operations ? [`- Operations: ${departments.operations}`] : []),
    ...(departments?.pda ? [`- PDA review: ${departments.pda}`] : []),
    ...(departments?.businessDevelopment ? [`- Business development: ${departments.businessDevelopment}`] : []),
    ...(whatsapp && whatsappHref ? [`- WhatsApp: ${whatsapp} (${whatsappHref})`] : []),
    "",
  ];

  return lines.join("\n");
}
