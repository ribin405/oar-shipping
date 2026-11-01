#!/usr/bin/env node
/**
 * Post-build site audit: crawls a running production server and checks what
 * search and generative engines read. No dependencies.
 *
 *   NEXT_PUBLIC_SITE_URL=https://example.com npm run build
 *   NEXT_PUBLIC_SITE_URL=https://example.com npm start
 *   npm run check:site            # audits http://localhost:3000
 *   SITE_BASE=http://localhost:3100 npm run check:site
 *
 * The server must have been built with a public NEXT_PUBLIC_SITE_URL, because
 * without one the site deliberately emits no canonical URLs, structured data
 * or sitemap entries. Exits 1 when any error is found.
 */

const BASE = (process.env.SITE_BASE ?? process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const TITLE_MAX = 70;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 165;

const errors = [];
const warnings = [];
const error = (page, message) => errors.push(`${page}  ${message}`);
const warn = (page, message) => warnings.push(`${page}  ${message}`);

const decode = (text) =>
  text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=("([^"]*)"|'([^']*)')`, "i"));
  return match ? decode(match[2] ?? match[3] ?? "") : undefined;
};
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
const metaContent = (html, key, value) => {
  const tag = tags(html, "meta").find((t) => attr(t, key) === value);
  return tag ? attr(tag, "content") : undefined;
};

async function get(path) {
  const response = await fetch(BASE + path, { redirect: "manual" });
  return { status: response.status, headers: response.headers, body: await response.text() };
}

function auditPage(path, html, site) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  const description = metaContent(html, "name", "description");
  const canonical = tags(html, "link").find((t) => attr(t, "rel") === "canonical");
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) error(path, "missing <title>");
  else if (decode(title).length > TITLE_MAX) error(path, `title is ${decode(title).length} characters (max ${TITLE_MAX})`);
  if (!description) error(path, "missing meta description");
  else if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
    error(path, `description is ${description.length} characters (needs ${DESCRIPTION_MIN}-${DESCRIPTION_MAX})`);
  }
  if (h1Count !== 1) error(path, `has ${h1Count} <h1> elements (needs exactly 1)`);
  if (!/<html[^>]*\blang="[a-z-]+"/i.test(html)) error(path, "missing <html lang>");
  if (!tags(html, "meta").some((t) => attr(t, "name") === "viewport")) error(path, "missing viewport meta");

  if (!canonical) error(path, "missing canonical link (was the site built with NEXT_PUBLIC_SITE_URL?)");
  else if (site.origin) {
    const expected = site.origin + (path === "/" ? "" : path);
    if (attr(canonical, "href") !== expected) error(path, `canonical is ${attr(canonical, "href")}, expected ${expected}`);
  }

  for (const key of ["og:title", "og:description", "og:image", "og:url", "og:type"]) {
    if (!metaContent(html, "property", key)) error(path, `missing ${key}`);
  }
  for (const key of ["twitter:card", "twitter:title", "twitter:image"]) {
    if (!metaContent(html, "name", key)) error(path, `missing ${key}`);
  }
  if (tags(html, "meta").some((t) => attr(t, "name") === "robots" && /noindex/i.test(attr(t, "content") ?? ""))) {
    error(path, "has a noindex robots meta tag");
  }

  for (const img of tags(html, "img")) {
    if (attr(img, "alt") === undefined) error(path, `<img> without alt: ${(attr(img, "src") ?? "").slice(0, 60)}`);
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (blocks.length === 0) warn(path, "no JSON-LD");
  for (const block of blocks) {
    try {
      const json = JSON.parse(block);
      if (json["@context"] !== "https://schema.org") error(path, "JSON-LD without the schema.org @context");
    } catch {
      error(path, "JSON-LD is not valid JSON");
    }
  }

  const links = new Set();
  for (const tag of tags(html, "a")) {
    const href = attr(tag, "href");
    if (!href || href.startsWith("#") || /^(mailto:|tel:|https?:\/\/)/i.test(href)) continue;
    links.add(href.split("#")[0].split("?")[0] || "/");
  }
  return { title: title && decode(title), description, links };
}

async function main() {
  console.log(`Auditing ${BASE}\n`);
  const home = await get("/");
  if (home.status !== 200) {
    console.error(`Cannot reach ${BASE}/ (status ${home.status}). Start the production server first.`);
    process.exit(2);
  }

  const canonicalTag = tags(home.body, "link").find((t) => attr(t, "rel") === "canonical");
  const site = { origin: canonicalTag ? new URL(attr(canonicalTag, "href")).origin : undefined };

  const seen = new Map();
  const queue = ["/"];
  while (queue.length > 0) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    const page = path === "/" ? home : await get(path);
    if (page.status !== 200) {
      error(path, `status ${page.status}`);
      seen.set(path, null);
      continue;
    }
    const result = auditPage(path, page.body, site);
    seen.set(path, result);
    for (const href of result.links) if (href.startsWith("/") && !seen.has(href)) queue.push(href);
  }

  const pages = [...seen.entries()].filter(([, result]) => result);
  for (const field of ["title", "description"]) {
    const byValue = new Map();
    for (const [path, result] of pages) byValue.set(result[field], [...(byValue.get(result[field]) ?? []), path]);
    for (const [value, paths] of byValue) {
      if (paths.length > 1) error(paths.join(", "), `share the same ${field}: "${String(value).slice(0, 60)}"`);
    }
  }

  const robots = await get("/robots.txt");
  if (robots.status !== 200) error("/robots.txt", `status ${robots.status}`);
  else if (/^\s*disallow:\s*\/\s*$/im.test(robots.body)) error("/robots.txt", "disallows the whole site (is NEXT_PUBLIC_SITE_URL set and the build a production build?)");
  else if (!/^sitemap:/im.test(robots.body)) error("/robots.txt", "has no Sitemap line");

  const sitemap = await get("/sitemap.xml");
  if (sitemap.status !== 200) error("/sitemap.xml", `status ${sitemap.status}`);
  else {
    const listed = new Set([...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(decode(m[1])).pathname));
    for (const [path] of pages) if (!listed.has(path)) error(path, "is reachable but missing from the sitemap");
    for (const path of listed) if (!seen.has(path)) warn(path, "is in the sitemap but was not reached by crawling links");
  }

  const llms = await get("/llms.txt");
  if (llms.status !== 200) error("/llms.txt", `status ${llms.status}`);
  else if (!llms.body.startsWith("# ")) error("/llms.txt", "does not start with an H1");

  console.log(`Pages audited: ${pages.length}`);
  for (const [path] of pages) console.log(`  ${path}`);
  if (warnings.length) console.log(`\nWarnings (${warnings.length})\n  ${warnings.join("\n  ")}`);
  if (errors.length) {
    console.log(`\nErrors (${errors.length})\n  ${errors.join("\n  ")}`);
    process.exit(1);
  }
  console.log("\nNo errors.");
}

main().catch((cause) => {
  console.error(cause);
  process.exit(2);
});
