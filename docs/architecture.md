# Architecture

How the site is organised, how data flows from content to rendered pages and search-engine output, and what to do when it grows. For visual rules see [design-system.md](design-system.md).

## Principles

1. **Content is data, pages are templates.** Everything Oar states lives as typed data in `src/content/` and `src/config/`. Components render it; they never hold copy.
2. **One source per fact.** Routes, contact details, services, ports and the site description each exist once and are imported everywhere (including `sitemap`, `llms.txt` and JSON-LD), so the site cannot contradict itself.
3. **Fail at build, not in production.** Content validation and SEO limits throw during `next build`, naming the offending entry.
4. **Server by default.** Client components exist only for interaction (`NavLink`, `MobileNavigation`, `PlayOnView`). No analytics, no third-party scripts, no remote images; the CSP enforces it.
5. **Never invent a business fact.** A field is absent until Oar has confirmed it.

## Layers

```text
src/config/      routes.ts, navigation.ts, footer.ts, contact.ts        what the site links to and how to reach Oar
src/types/       Service, Port, Insight, ContactDetails, ...             the shapes content must have
src/content/     services/, home/, ports/, insights/, about/, ...        the words, as typed data
src/lib/         site-config, seo/*, validation/*, quote/*, email/*      logic with no UI
src/components/  layout, navigation, sections, cards, forms, media, ui   presentation
src/app/         routes: each page composes sections and exports metadata
src/styles/      tokens, typography, base, header, motion, components, home
scripts/         check-site.mjs                                          post-build audit
```

Dependencies point downward only: `app` -> `components` -> `lib`/`content`/`config`/`types`. `content` never imports a component.

## Rendering and routing

- App Router, all pages statically generated. Dynamic routes (`/services/[slug]`, `/ports/[slug]`, `/insights/[slug]`) use `generateStaticParams` and `dynamicParams = false`, so unknown slugs are real 404s.
- `proxy.ts` redirects case variants to the lowercase canonical path, rejects malformed percent-escapes and answers non-GET/HEAD methods with 405 on those routes.
- Pages are composed from `Section` + `SectionHeader` blocks on a flat white page. The homepage is in `src/app/page.tsx`: hero, facts, divisions, port call, ports, why Oar, PDA review, closing band.

## Data flow: content to every consumer

```text
content/services/*  ──┬─> service pages + overview + homepage divisions
                      ├─> sitemap.ts (one URL per entry)
                      ├─> structured-data.ts (Service nodes, OfferCatalog, knowsAbout)
                      └─> llms.ts (/llms.txt)
config/contact.ts   ──┬─> footer, contact page, closing band
                      ├─> structured-data.ts (ContactPoint)
                      └─> llms.ts
content/ports/coverage.ts ─> homepage chips, ports page description, llms.txt
```

To add a **service**: add its slug to `serviceSlugs` in `types/service.ts`, create `content/services/<slug>.ts`, register it in `content/services/index.ts` and `capabilities.ts`, add a division photo in `public/images/divisions/` and an entry in `servicesIntro.panelImages`. The build fails if any step is missing. To add a **port** or **insight**, add a typed entry to the empty collection; pages, sitemap and metadata follow automatically.

## SEO

- **Metadata:** `buildPageMetadata` (`lib/seo/metadata.ts`) is the only way pages set metadata: canonical, Open Graph (`en_AE`), Twitter card and the shared social image (`/images/og/oar-og.jpg`, 1200 x 630).
- **Limits are enforced:** `lib/seo/limits.ts` fails the build when a rendered title is over 70 characters or a description is outside 70-165. Service meta text is checked in `content-validation.ts` too.
- **Indexing is explicit:** without a valid public `NEXT_PUBLIC_SITE_URL` the site emits no canonicals, sitemap entries or structured data, sets `noindex` and disallows crawling in `robots.txt`. Non-production Vercel deployments are never indexable.
- **Sitemap and robots:** generated from the route list and content collections (`app/sitemap.ts`, `app/robots.ts`).
- **Headings:** exactly one `<h1>` per page (`InnerPageHero` or the hero); section titles are `<h2>`.

## Structured data and GEO (generative engine optimisation)

`lib/seo/structured-data.ts` emits one connected JSON-LD graph with stable `@id`s: `Organization` (name, logo, Fujairah base, UAE `areaServed`, `knowsAbout`, a `ContactPoint` per confirmed mailbox, an `OfferCatalog` pointing at each `Service`), `WebSite`, and a typed page node per page (`WebPage`, `AboutPage`, `ContactPage`, `CollectionPage` with an `ItemList`) plus `BreadcrumbList` and `Service`. `buildPageNode` reads the page's own `metadata`, so structured data and meta tags cannot drift.

Absent on purpose until Oar confirms them: legal name, street address, telephone, `sameAs` profiles, founding date, prices, ratings and reviews. Adding these later is a one-field change in `config/contact.ts` or the builder.

`/llms.txt` (`app/llms.txt/route.ts`, built by `lib/seo/llms.ts`) is a plain-text, answer-first summary for AI engines and agents: description, services with URLs, covered ports, the four port-call stages and contact routes. It is generated from the same content, so it is always current.

Content guidance for answer engines: lead each page with a plain-language statement of what Oar does and where; keep claims specific and verifiable; keep the ports, services and contact facts consistent everywhere (the single sources above make that automatic).

## Quality gates

| Command | What it checks |
| --- | --- |
| `npm run check` | ESLint and TypeScript |
| `npm run build` | content validation, SEO limits, all pages generate |
| `npm run check:site` | crawls a running production server: status, title/description length and uniqueness, one `h1`, canonical, Open Graph/Twitter, `alt` on images, valid JSON-LD, sitemap coverage, `robots.txt`, `llms.txt` |

CI (`.github/workflows/ci.yml`) runs all three on every push and pull request, building with a public `NEXT_PUBLIC_SITE_URL` so the audit sees what production would emit.

## Security and performance

- Security headers and a production CSP in `next.config.ts` (no external origins; images are local). `/images/*` is cached for a day with a week of stale-while-revalidate; hashed `_next/static` assets are immutable.
- Images go through `next/image` (AVIF/WebP). The hero uses `<picture>` art direction (landscape and a 3:4 portrait crop), eager loading and `fetchPriority="high"`. Changing the photograph? Use a new file name: the optimiser caches by URL.
- Fonts are self-hosted by `next/font` (Inter, Manrope, Fraunces); animation uses transform/opacity only and respects `prefers-reduced-motion`.

## Growing the site

- **Another language (for example Chinese):** add a locale segment, move copy into per-locale content files with the same types, emit `alternates.languages` (hreflang) from `buildPageMetadata`, and extend the sitemap.
- **Real articles and port pages:** fill the empty collections. Insights is hidden until the first article exists: `hasInsights` (in `content/insights`) removes it from the navigation, footer and sitemap and marks `/insights` noindex; the first published article switches all of that on. The section can then return to the homepage.
- **A CMS:** keep the types in `src/types/` as the contract and replace the content modules with a loader that returns the same shapes; nothing above `content/` changes.
- **Testing:** the build-time validation and `check:site` cover structure and SEO. Add unit tests (for example Vitest) for `lib/validation` and the quote action before the quote flow changes.
