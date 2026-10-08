# OAR Design System

Visual source: the approved Stitch design (colors, type, geometry, section rhythm). Implementation source: this repository. Business content in Stitch (statistics, SLAs, tracking data, contact details) is **not** carried over; components take neutral props.

Live reference: run `npm run dev` and open `/design-system` (development only; not built into production).

## Tokens (`src/app/globals.css`)

- **Brand palette** (`bg-midnight`, `text-marine-blue`, ...): Midnight, Deep Navy, Marine Blue, Ocean, Signal Cyan, Off White, White, Slate, Dark Text, Line (the approved "Border" `#D9E1E5`), Error. The default Tailwind palette is removed.
- **Static roles:** `surface`, `surface-muted`, `surface-dark`, `surface-dark-elevated`, `primary`, `primary-hover`, `accent`, `control` (derived 3:1 border for form controls).
- **Surface-aware roles:** `background`, `foreground`, `muted`, `border`, `card`, `link`, `focus`. These change with the nearest `data-surface` ancestor, so components never hard-code text colors for dark sections.
- **Typography:** `type-display`, `type-h1`..`type-h4`, `type-body-lg`, `type-body`, `type-body-sm`, `type-label`, `type-eyebrow`. Section titles use `type-h1` (36px) on an `<h2>`; pages use `type-display` for the single `<h1>`.
- **Geometry:** radii 4px (`rounded-sm`, badges/checkboxes), 6px (`rounded-md`, controls/buttons), 8px (`rounded-lg`, cards), 12px (`rounded-xl`, hero media). Shadows: `shadow-panel`, `shadow-overlay`; prefer borders.
- **Layout:** `max-w-content` (1320px) with 16/24/32px gutters via `Container`. Spacing uses Tailwind's scale.

## Surfaces

`Section` sets `data-surface="light | muted | dark | dark-elevated"`. Use `Section` for every page band; use `spacing="default | compact | hero"` for vertical rhythm.

## Components

| Layer | Components |
| --- | --- |
| `layout/` | `Container`, `Section`, `SectionHeader`, `StatusPage` |
| `ui/` | `Button`, `ButtonLink`, `Eyebrow`, `Badge`, `ArrowLink`, `IconBox`, `Card`, `RouteFlow` |
| `cards/` | `ServiceCard`, `IndustryCard`, `PortCard`, `InsightCard` (props only, no business data) |
| `forms/` | `Label`, `FormField`, `Input`, `Textarea`, `Select`, `Checkbox` |
| `media/` | `MediaFrame` |

Whole-card links: put an `ArrowLink` with `stretched` inside a `Card interactive`; the card stays a single, keyboard-focusable link.

## Icons

`lucide-react` only. Decorative icons are `aria-hidden` by default; size with `size-4` (inline), `size-5` (controls), `size-7` (card headers). Never use an icon as the only label of an interactive element.

## Images

Use `MediaFrame` (`next/image`, local files under `public/images/`). Ratios: `landscape` 16:9, `standard` 3:2, `portrait` 4:5, `square`, `fill` (hero background). Overlays: `scrim` (bottom fade for captions), `hero` (Midnight left-to-right wash). Set `preload` only on the LCP image (Next 16 replaces `priority`).

## Motion

Motion communicates direction and state, never decoration: color/shadow transitions at 200ms (`ease-standard`), a 2px arrow nudge on link hover, a spinner for loading. Always gate movement with `motion-safe:`; `globals.css` also neutralizes animation under `prefers-reduced-motion`. No animation library is installed; add `motion` only when a localized client component needs it.

## Responsive decisions

- Headings scale at `md` (Display 32 -> 48px, H1 26 -> 36px). Section spacing steps up at `md`.
- Header navigation switches at `lg` (Stitch shows links at 1024px+, with a menu below); both layouts must read `@/config/navigation`.
- `RouteFlow` stacks vertically with downward connectors below `lg`, and runs left to right with arrows from `lg`.
- Card grids go 1 column, 2 at `md`, 3 at `lg`. Buttons stay content-width; use `fullWidth` for stacked mobile CTAs.

## Global shell (`components/layout`, `components/navigation`)

- `PageShell` (used by the root layout): skip link, `Header`, the single `<main id="main-content">`, `Footer`. The root layout stays a Server Component.
- `Header` is server-rendered, sticky, 64px (72px at `lg`). Navigation comes from `config/navigation.ts`; footer groupings live in `config/footer.ts`.
- **Header modes:** solid by default. A page with a full-bleed dark hero renders any element with `data-header="overlay"`; the header then floats, transparent with light text, until the page scrolls or the mobile menu opens. This is CSS only (`.site-header` in `globals.css`); `HeaderScrollState` sets `data-scrolled` on `<html>` with an IntersectionObserver. Pages stay Server Components.
- **Client components (and why):** `NavLink` (current-route state via `usePathname`), `MobileNavigation` (open/close state, Escape, scroll lock), `HeaderScrollState` (IntersectionObserver). Everything else is server-rendered.
- **Logo:** `Logo` masks `public/images/brand/oar-logo.png` (white on transparent, derived from the client-supplied logo) with the current text color. Replace that file (or point the mask at an SVG) when final brand assets arrive.
- **Footer legal links:** add Privacy Policy and Terms to `footerLegalLinks` when those pages exist; they render automatically.

## Homepage hero image

The hero reads `heroContent.image` in `src/content/home/hero.ts` (currently `null`, which renders the navy backdrop). To enable the photograph, add a ~2400x1350 JPEG or WebP under `public/images/hero/` and set `{ src, alt: "", position }`. `MediaFrame` handles optimization, preload, the Midnight wash and (on narrow screens) a uniform extra wash. Keep the image brand-free: no third-party logos or terminal branding, and no text baked in. The photograph must be licensed or approved by OAR.

## Content-ready homepage sections

`PortsSection` and `InsightsSection` read typed, intentionally empty collections (`src/content/ports/index.ts`, `src/content/insights/index.ts`). With no entries they show a general UAE statement with a conceptual (non-geographic) route graphic, and a topic list. Add verified `Port` or `Insight` entries and they render `PortCard` / `InsightCard` automatically. `TrustSection` is editorial until OAR approves credentials, partnerships or case studies. `RouteFlow` takes `layout="xl"` for flows with many steps (vertical until 1280px).

## Inner pages

Inner pages (`/about`, `/why-oar`, `/industries`) compose shared sections: `InnerPageHero` (the page's single `<h1>`; supports an optional `visual` and light/dark variant), `NarrativeSection` (heading, paragraphs, optional aside), `CapabilityGrid` (`linkTo="detail" | "listing"`), `PrincipleGrid`, `IndustryGrid` (`variant="summary" | "detail"`), `JourneyDiagram` (OAR band across an ordered journey; `orientation="vertical" | "responsive"`), `MovingPartsPanel` and `CtaSection`. Page copy lives in `src/content/<page>/page.ts`; services and audiences have one source each (`content/services/capabilities.ts`, `content/industries/audiences.ts`). Use `title: { absolute }` in `buildPageMetadata` to skip the site title template.

## Services architecture

One typed collection drives every service surface. `content/services/capabilities.ts` holds each service's slug, title, icon and summary (used by the homepage, strip, footer and listings); `content/services/<slug>.ts` holds its detail content (`ServiceDetailContent`); `content/services/index.ts` merges them into `services` and exposes `getService`. `ServiceSlug` is a union and the detail map is a `Record<ServiceSlug, ...>`, so a missing service fails type-checking. `/services/[slug]` renders the single `ServiceDetail` template with `generateStaticParams` and `dynamicParams = false` (unknown slugs return a real 404). Related services, audiences (`AudienceSlug`), coordinated activities (`CoordinationKind`) and FAQs are all data. `Accordion` uses native `<details>` (no JavaScript). An approved service image can be set per service via `image`; it renders through `InnerPageHero`'s `visual` slot.

## Ports architecture

`content/ports/index.ts` is the canonical port collection and is intentionally empty until OAR confirms specific ports; `getPort(slug)` looks entries up. `/ports/[slug]` renders the single `PortDetail` template (`generateStaticParams` from the collection, `dynamicParams = false`, `notFound()` for unknown slugs); `/ports` is always available and shows a verified-port grid only when entries exist. The sitemap, overview, homepage Ports section and detail pages all derive from the collection.

To add a verified port: append one `Port` entry (`types/port.ts`) to the collection. Keep general facts (`description`, `operationalNotes`) separate from verified statements about OAR (`oarRole`); only list `services`/`audiences` that are verified for that port; set `image` only for an approved, brand-free asset. Do not add a port because it exists, only when OAR's role there is confirmed.

## Insights architecture

`content/insights/index.ts` is the canonical, intentionally empty collection of approved insights, with `getInsight`, `getSortedInsights`, `getFeaturedInsight`, `getRelatedInsights` (drops unknown and self references) and `getReadingTimeMinutes` (derived from `content`, never hand-entered). `/insights/[slug]` renders the single `InsightDetail` template (`generateStaticParams`, `dynamicParams = false`, `notFound()`); `/insights` shows the grid, and a featured entry, only when entries exist, and an editorial perspective section otherwise. The homepage Insights section reads the same collection and falls back to its topics list.

To publish an insight: add one `Insight` entry (required: `slug`, `title`, `excerpt`, `kind`). Set `author`, `publishedAt`, `image`, `category` and related items only when approved and real; body text is structured `InsightBlock`s (heading, paragraph, list, quote), rendered as semantic HTML, never raw HTML. Categories are labels, not routes.

## Contact

`config/contact.ts` is the single source of public contact details (`ContactDetails`, every field optional) and is intentionally empty until OAR confirms them. `lib/contact.ts` turns the set fields into channels; the footer and the Contact page both render them through `ContactChannelList`, and unset fields produce nothing (no dashes, no placeholders). With no verified channels, the footer shows a "Contact OAR" link and the Contact page omits its details section. The "ways to engage" cards are informational, not links: the quote workflow is a later phase. Never infer contact data (an email from the domain, an office from the markets served, social accounts from the company name).
