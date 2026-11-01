# OAR Shipping Website

## Project overview

Public website for OAR Shipping, an international B2B marine logistics and port-execution company operating in the UAE.

The site is built: homepage, service pages, quote request and the company pages, on a single flat white theme (see [docs/design-system.md](docs/design-system.md)).

## Technology stack

- [Next.js](https://nextjs.org) (App Router, Server Components first)
- React 19
- `lucide-react` for icons
- TypeScript (`strict: true`)
- Tailwind CSS v4 (tokens defined in CSS with `@theme`)
- `next/font` for Manrope (headings) and Inter (body)
- ESLint with `eslint-config-next`

There is no database, authentication, CMS or API server. The site is portable to any Node.js host.

## Local development

Requires Node.js 20.9 or later.

```bash
npm ci
cp .env.example .env.local   # optional for local development
npm run dev
```

The site runs at <http://localhost:3000>. Fonts are fetched from Google Fonts at build/dev time and self-hosted in the output.

## Environment variables

See [.env.example](.env.example). `NEXT_PUBLIC_SITE_URL` is the canonical public origin (https, no path) and drives canonical URLs, Open Graph URLs, the sitemap and `robots.txt`; **it must be set for production builds**. In development it falls back to `http://localhost:3000`. If it is missing, invalid, not `https`, or a loopback host in a production build, the site does not fall back to localhost: canonical and sitemap URLs are omitted, pages are `noindex` and `robots.txt` disallows all crawling. Non-production Vercel deployments (`VERCEL_ENV` other than `production`) are also disallowed. The quote-delivery variables are described below. `NEXT_PUBLIC_GA_ID` is reserved for a later phase. Never commit `.env.local` or real secrets, and never read secrets in Client Components.

## Quote request delivery

The quote form (`/request-a-quote`) submits to a Server Action (`src/lib/quote/submit-quote.ts`). The server re-validates the data with the same Zod schema, then sends one email through Resend (`src/lib/quote/deliver-quote.ts`). The browser never contacts the provider, and nothing is stored.

Three server-only variables are required (names in [.env.example](.env.example); never use a `NEXT_PUBLIC_` prefix):

- `RESEND_API_KEY`
- `OAR_RFQ_RECIPIENT_EMAIL`: the verified OAR mailbox that receives requests.
- `OAR_RFQ_FROM_EMAIL`: a sender on a domain verified in Resend.

If any is missing, delivery is disabled: the form shows a generic failure message, nothing is sent, and there is no fallback address. The site still builds without them. The visitor's email is used only as `Reply-To`.

Security notes: user input is HTML-escaped in the email; a hidden honeypot field drops bot submissions silently; Next.js checks the request Origin against the Host for Server Actions (set `experimental.serverActions.allowedOrigins` only if deployed behind a proxy that rewrites the host). There is no rate limiter; add provider-side or edge limits before launch if abuse appears. Production responses also carry a baseline Content-Security-Policy (everything restricted to the site's own origin, no framing, plugins or base-tag changes; `script-src` still allows inline scripts because Next.js static pages need them), `X-Frame-Options: DENY` and `Cross-Origin-Opener-Policy: same-origin`; see `next.config.ts` and `docs/qa/phase-9e-security-qa.md`. Logs record event codes and variable names only, never personal data or secrets.

## Project structure

```text
public/            Static assets (images/, icons/, fonts/)
src/app/           Routes, layouts, metadata files (robots, sitemap), error/loading/not-found
src/components/    layout (shell, header, footer), navigation, sections, cards, forms, media, ui
src/config/        routes.ts (all route paths), navigation.ts (primary navigation), footer.ts (footer groupings)
src/content/       Typed content per collection (services, industries, ports, insights)
src/lib/           site-config.ts, utils.ts, fonts.ts, seo/, email/, validation/, images/
src/types/         Content types
```

Conventions:

- Import with the `@/*` alias (maps to `src/*`).
- Use `routes` from `@/config/routes` instead of writing path strings.
- Navigation is defined once in `@/config/navigation`; desktop and mobile navigation must both consume it.
- Site-wide facts live in `@/lib/site-config`. Do not add a value to any content file unless OAR has verified it; missing information stays absent.
- Content collections (`src/content/*`) validate themselves on import (`@/lib/content-validation`): duplicate slugs, empty required text, unknown or self references fail the build with a message naming the entry.
- Public contact details live only in `@/config/contact` and are empty until OAR confirms them. Set a field only when verified; the footer and Contact page render exactly the fields that are set.
- Colors, type styles, geometry and the container width are design tokens in `src/styles/theme.css`. Use token classes (`bg-primary`, `text-muted`, `type-h2`, `max-w-content`) rather than arbitrary values. See [docs/design-system.md](docs/design-system.md); a live reference is at `/design-system` in development.
- Default to Server Components. Add `"use client"` only for interactivity.
- Respect reduced motion: use Tailwind's `motion-safe:` variant for animation.
- Build page bands with `Section` (`spacing` prop). Sections paint no background: every page is flat white, so separate bands with hairline rules (`SectionHeader`), space and photographs.

## Development workflow

```bash
npm run dev         # development server
npm run check       # ESLint + TypeScript (no emit)
npm run build       # also validates content and SEO limits
npm run check:site  # audits a running production server (see below)
```

Do not use `any`, `@ts-ignore` or `@ts-nocheck`. Run `check`, `build` and `check:site` before merging; CI does the same. The architecture, data flow and how to extend the site are in [docs/architecture.md](docs/architecture.md).

To run the site audit locally, build and start with a public origin (otherwise the site deliberately emits no canonicals, structured data or sitemap), then audit it:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com npm run build
NEXT_PUBLIC_SITE_URL=https://example.com npm start
npm run check:site     # or: SITE_BASE=http://localhost:3100 npm run check:site
```

## Build

```bash
npm run build
npm run start
```

## Deployment notes

- Runs on any host that supports Node.js; no provider-specific APIs are used.
- Set `NEXT_PUBLIC_SITE_URL` to the public origin at build time.
- Baseline security headers are set in `next.config.ts`. A baseline Content-Security-Policy is added in production builds (see `next.config.ts`).
- Page-level `robots`/`sitemap` allow indexing by default. Block indexing on non-production environments at the host level.
- Production images should be stored locally under `public/images/` and served through `next/image`; no remote image domains are configured.

## Content management approach

Content is kept in the repository as typed data under `src/content/`, separate from presentation components. Types live in `src/types/`. Editing content is a code change reviewed through pull requests. A CMS is intentionally out of scope.

## Technical SEO notes

- Metadata: `src/lib/seo/metadata.ts` holds the root defaults (title template `%s | Oar Shipping`) and `buildPageMetadata`, used by every page and by `generateMetadata` on service, port and insight routes. Each page sets a root-relative canonical, resolved against `metadataBase`.
- Sitemap and robots are generated by `src/app/sitemap.ts` and `src/app/robots.ts` from the route and content collections; empty ports and insights contribute no URLs. Unknown slugs return 404 with `noindex` and no canonical.
- Limits: `src/lib/seo/limits.ts` fails the build for titles over 70 characters or descriptions outside 70-165.
- Social image: `public/images/og/oar-og.jpg` (1200 x 630), set as `ogImage` in `src/lib/site-config.ts`; replace it when Oar supplies a branded card.
- Structured data and GEO: `src/lib/seo/structured-data.ts` (one connected JSON-LD graph) and `/llms.txt` (`src/lib/seo/llms.ts`), both generated from the same content; see [docs/architecture.md](docs/architecture.md).
- Host normalisation (http to https, `www` to the apex or the reverse) must be configured at the hosting/DNS layer to match `NEXT_PUBLIC_SITE_URL`. Next.js already redirects trailing-slash URLs to the slash-less form.
- Redirects: the app defines none. No legacy URLs are known, so there are no redirect candidates; add them once the old site's URL inventory is verified.
# oar-shipping


git remote add origin https://github.com/ribin405/oar-shipping.git
git branch -M main
git push -u origin main


git add .
git commit -m "our shipping "
git push