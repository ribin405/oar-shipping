# OAR Shipping Internal Linking & Crawl Architecture

Phase 8E. Audit date 2026-10-06. Source of truth for page roles: `docs/seo/keyword-architecture.md`. No pages, routes or navigation items were added.

## A. Page graph

Link counts come from a crawl of the production build starting at `/`. "Contextual" means links inside page content or breadcrumbs (not the header or footer).

```
HOME
├─ Services hub ──► 6 service pages ──► related services (canonical `related` data) ──► Request a Quote
├─ Industries ────► 6 service pages ──► Request a Quote, Contact
├─ Why OAR ───────► Industries, Services, Request a Quote
├─ Ports & Locations (explanatory) ──► Services (hub + 6 pages), Request a Quote
├─ Insights (empty) ─► Services, Why OAR, Request a Quote
├─ About ─────────► Services (6 pages), Why OAR, Request a Quote
├─ Contact ───────► Request a Quote, Services
└─ Request a Quote (conversion endpoint; breadcrumb back to Home only)
```

Header and footer link to every top-level page and to the six services on every page.

| Page | Contextual inbound (from N pages) | Notes |
|---|---|---|
| `/services` | 13 | Primary hub |
| `/request-a-quote` | 14 | Primary conversion target |
| `/` | 11 | |
| `/industries` | 9 | |
| `/why-oar` | 9 | Was 8; homepage now links to it |
| `/about` | 7 | |
| `/services/*` | 4–8 each | Hub, homepage, About, Industries, Ports, and related services |
| `/contact` | 3 | Also in header and footer |
| `/ports` | 1 | Was 0; now linked from the homepage |
| `/insights` | 1 | Homepage; header and footer |

## B. Orphan audit

No orphaned indexable pages. Every page is reachable from the homepage in at most two clicks and has header and footer links. Before this phase `/ports` was reachable only through the header and footer; it now also has a contextual link from the homepage.

## C. Anchor strategy

- Navigation labels are the approved IA names and are unchanged.
- Service cards use the visible service name plus a short action ("Explore service") and expose the service name in the accessible name ("Explore service: Port Logistics"). No "click here" or "read more".
- Hub links say what they lead to ("View all services", "All industries", "Why OAR in detail"). No exact-match keyword anchors are used anywhere; the service names themselves are the descriptive anchors.
- Conversion links use direct action wording ("Request a Quote", "Contact OAR", "Explore Services").
- Related-service links come from the existing `related` arrays in `src/content/services/`. They are intentionally not reciprocal everywhere and are not "every service links to every service". Port Logistics and Port Coordination link to each other; Vessel Delivery and Cargo Transportation link to each other; Customs Clearance and Warehousing are not cross-linked (the link would imply bonded or stored-goods handling that OAR has not verified).

## D. Conversion paths

- Home → Services → a service page → Request a Quote (header CTA, hero CTA and the closing CTA on each service page).
- Home → Industries → a service page (Industries service cards now link to the individual service pages) → Request a Quote.
- Home → Why OAR (new homepage link) → Request a Quote.
- Home → Request a Quote directly (hero and header).

## Changes made in Phase 8E

1. **Homepage → `/ports`:** the "Ports & Locations" section's button changed from "Discuss Your Port Requirement" (to `/contact`) to "Explore Ports & Locations" (to `/ports`). The old link did not match the section.
2. **Homepage → `/why-oar`:** added a "Why OAR in detail" link to the Why OAR section header (existing ArrowLink component).
3. **About and Industries service cards:** each card was labelled with a service name but linked to the `/services` hub. They now link to the matching `/services/[slug]` page. This fixed an anchor/destination mismatch and gave every service page more inbound links.

Files: `src/content/home/ports.ts`, `src/content/home/why-oar.ts`, `src/components/sections/why-oar-section.tsx`, `src/app/about/page.tsx`, `src/app/industries/page.tsx`.

## E. Deferred opportunities

- Port-to-port and location links: deferred until OAR verifies ports served; `/ports/[slug]` stays unpublished.
- Insight-to-service links: the insight template already supports `relatedServices`; links appear automatically once genuine articles exist. No articles were created.
- Audience detail links: deferred; there are no audience pages (the Industries page links to services instead).
- Customs Clearance ↔ Warehousing cross-link: deferred pending verification of OAR's storage and customs arrangements.
- Contact-page links to phone, email or WhatsApp: none exist because no verified details exist; `mailto:` and `tel:` links must not be added until then.
- The footer has two links to `/contact` ("Contact" and "Contact OAR"); kept because the second stands in for verified contact details that do not yet exist. Revisit once contact details are supplied.

## Link validation method

A temporary crawler followed every internal `href` from `/`, recording status, inbound and outbound links and anchor text. It found no 404 targets, no `#`, empty, `undefined`, `null`, `javascript:`, `mailto:` or `tel:` hrefs, no query-string or trailing-slash variants, no external links and no localhost links. The crawler was deleted after use.
