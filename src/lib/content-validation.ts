import { audienceSlugs, type IndustryAudience } from "@/types/industry";
import type { Insight } from "@/types/insight";
import type { Port } from "@/types/port";
import { serviceSlugs, type Service } from "@/types/service";

/**
 * Lightweight integrity checks for local content. They run when a content
 * collection is first imported, so a mistake fails `next build` (and the dev
 * server) with a message that names the offending entry, instead of shipping
 * a broken link or an empty heading. Types already cover most references;
 * these cover what types cannot.
 */

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function fail(message: string): never {
  throw new Error(`Content error: ${message}`);
}

function requireText(where: string, field: string, value: string | undefined): void {
  if (!value || value.trim() === "") fail(`${where} has an empty "${field}".`);
}

function requireItems(where: string, field: string, values: readonly unknown[] | undefined): void {
  if (!values || values.length === 0) fail(`${where} needs at least one "${field}".`);
}

function requireUniqueSlugs(collection: string, slugs: readonly string[]): void {
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (!SLUG_PATTERN.test(slug)) fail(`${collection} slug "${slug}" must be lowercase letters, numbers and hyphens.`);
    if (seen.has(slug)) fail(`${collection} has a duplicate slug "${slug}".`);
    seen.add(slug);
  }
}

function requireExactSlugs(collection: string, actual: readonly string[], expected: readonly string[]): void {
  for (const slug of expected) if (!actual.includes(slug)) fail(`${collection} is missing "${slug}".`);
  for (const slug of actual) if (!expected.includes(slug)) fail(`${collection} has unexpected "${slug}".`);
}

function requireNoSelfOrDuplicates(where: string, field: string, self: string, slugs: readonly string[] | undefined): void {
  if (!slugs) return;
  if (slugs.includes(self)) fail(`${where} lists itself in "${field}".`);
  if (new Set(slugs).size !== slugs.length) fail(`${where} has duplicates in "${field}".`);
}

export function validateServices(services: readonly Service[]): void {
  requireUniqueSlugs("services", services.map((service) => service.slug));
  requireExactSlugs("services", services.map((service) => service.slug), serviceSlugs);

  for (const service of services) {
    const where = `Service "${service.slug}"`;
    requireText(where, "title", service.title);
    requireText(where, "description", service.description);
    requireText(where, "metaTitle", service.metaTitle);
    requireText(where, "metaDescription", service.metaDescription);
    requireText(where, "hero.title", service.hero.title);
    requireText(where, "hero.description", service.hero.description);
    requireItems(where, "problem paragraph", service.problem.paragraphs);
    requireItems(where, "role paragraph", service.role.paragraphs);
    requireItems(where, "coordinates", service.coordinates);
    requireItems(where, "requirements", service.requirements);
    requireItems(where, "audiences", service.audiences);
    requireItems(where, "faq", service.faq);
    requireNoSelfOrDuplicates(where, "related", service.slug, service.related);
  }
}

export function validateAudiences(audiences: readonly IndustryAudience[]): void {
  requireUniqueSlugs("industries", audiences.map((audience) => audience.slug));
  requireExactSlugs("industries", audiences.map((audience) => audience.slug), audienceSlugs);

  for (const audience of audiences) {
    const where = `Audience "${audience.slug}"`;
    requireText(where, "title", audience.title);
    requireText(where, "summary", audience.summary);
    requireText(where, "pageDescription", audience.pageDescription);
  }
}

export function validatePorts(ports: readonly Port[]): void {
  requireUniqueSlugs("ports", ports.map((port) => port.slug));

  for (const port of ports) {
    const where = `Port "${port.slug}"`;
    requireText(where, "name", port.name);
    requireText(where, "region", port.region);
    requireText(where, "summary", port.summary);
    requireItems(where, "description paragraph", port.description);
    requireNoSelfOrDuplicates(where, "services", port.slug, port.services);
    requireNoSelfOrDuplicates(where, "audiences", port.slug, port.audiences);
    for (const faq of port.faq ?? []) {
      requireText(where, "faq question", faq.question);
      requireText(where, "faq answer", faq.answer);
    }
  }
}

export function validateInsights(insights: readonly Insight[]): void {
  const slugs = insights.map((insight) => insight.slug);
  requireUniqueSlugs("insights", slugs);

  for (const insight of insights) {
    const where = `Insight "${insight.slug}"`;
    requireText(where, "title", insight.title);
    requireText(where, "excerpt", insight.excerpt);
    for (const field of ["publishedAt", "updatedAt"] as const) {
      const value = insight[field];
      if (value !== undefined && !ISO_DATE_PATTERN.test(value)) fail(`${where} has an invalid "${field}" (use YYYY-MM-DD).`);
    }
    requireNoSelfOrDuplicates(where, "relatedInsights", insight.slug, insight.relatedInsights);
    for (const related of insight.relatedInsights ?? []) {
      if (!slugs.includes(related)) fail(`${where} references unknown insight "${related}".`);
    }
    for (const block of insight.content ?? []) {
      if (block.type === "list") requireItems(where, "list item", block.items);
      else requireText(where, `${block.type} text`, block.text);
    }
  }
}
