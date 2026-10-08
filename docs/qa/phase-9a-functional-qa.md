# Phase 9A: Functional QA & Reliability

Date: 2026-10-07. Factual record of what was run. Items not run are listed under "Not performed".

## 1. QA scope

All 15 public routes, invalid routes, global navigation (desktop and mobile), CTAs and internal links, the six dynamic service pages, breadcrumbs, empty Ports/Insights collections, the Request-a-Quote form (client and Server Action), security and input handling, content validation, console/runtime behaviour and the production build.

## 2. Environment

Windows 11, Node 24.15, Next.js 16.3.8 (Turbopack), production build (`next build` then `next start`) on `localhost:3000`. RFQ delivery was exercised against a local mock email provider (no real email was sent; no real credentials exist). Browser checks used the in-app browser, with a 375x812 emulated viewport for the mobile menu and form tests.

## 3. Build baseline (after `npm ci`)

| Check | Result |
|---|---|
| `npm ci` | passes |
| `npm run lint` | pass |
| `npm run typecheck` | pass |
| `npm run build` | pass |
| `npm audit --omit=dev` | 0 vulnerabilities |
| `npm audit` (all dependencies) | 5 high, all dev-only lint tooling (`eslint-config-next`, `@next/eslint-plugin-next`, `fast-glob`, `micromatch`, `braces`). Not in the production bundle. The only fix offered is `npm audit fix --force`, which was not run. |

## 4. Route inventory

Derived from the build output and `src/app`: `/`, `/about`, `/why-oar`, `/industries`, `/services`, `/services/[slug]` (six static paths: port-logistics, vessel-delivery, customs-clearance, warehousing, cargo-transportation, port-coordination), `/ports`, `/ports/[slug]` (no entries), `/insights`, `/insights/[slug]` (no entries), `/contact`, `/request-a-quote`, `/robots.txt`, `/sitemap.xml`, `/_not-found`. This matches the expected architecture; there is no `/api/quote` route (the form uses a Server Action).

## 5. QA matrix

| Area | Test | Result | Severity | Fix |
|---|---|---|---|---|
| Routing | 15 public routes: 200, one H1, header, footer, RFQ CTA, no `undefined`/`null`/error text | PASS | n/a | n/a |
| Routing | Case-variant slugs (`/services/PORT-LOGISTICS`) | FAIL then fixed | P2 | `src/proxy.ts` redirects to lowercase (308) |
| Routing | Malformed escapes (`/ports/%E0%A4%A`, `/services/%E0%A4%A`) | FAIL then fixed (500 plain text) | P2 | `src/proxy.ts` returns the normal 404 |
| Navigation | Header links and logo (all eight destinations); footer links | PASS | n/a | n/a |
| Mobile menu | Open, Escape, link click, CTA click, 8 rapid open/close cycles; scroll lock released; focus returns to the button | PASS | n/a | n/a |
| CTAs | Home hero, strip, service cards, Why OAR, Ports, Insights, final CTA; Industries/About/Services cards link to the individual service page | PASS | n/a | n/a |
| Dynamic routes | Six services: correct H1, breadcrumb to `/services`, related services, no undefined | PASS | n/a | n/a |
| 404 | `/services/nope`, `/ports/nope`, `/insights/nope`, `/zzz`, `/api/quote`, encoded and extra-segment paths: HTTP 404, not-found UI, header and footer present, no leak, no redirect to home | PASS | n/a | n/a |
| RFQ | Empty submit: ten required fields flagged, first field focused, no request sent, no navigation | PASS | n/a | n/a |
| RFQ | Client validation: invalid emails, whitespace-only, short or alphabetic phone, over-length values | PASS (no request sent) | n/a | n/a |
| RFQ | Server validation (95 harness cases) | PASS | n/a | n/a |
| RFQ | Valid submission (mock provider): one email, subject from canonical service, Reply-To = customer | PASS | n/a | n/a |
| RFQ | Unconfigured: generic alert, values kept, button re-enabled, no config leak | PASS | n/a | n/a |
| RFQ | Provider failure (27-case harness): DELIVERY_FAILED, never success, no provider text | PASS | n/a | n/a |
| RFQ | Double submit: 3 clicks + 2 `requestSubmit()` calls produced 1 request and 1 email; button disabled with `aria-busy` and spinner | PASS | n/a | n/a |
| RFQ | Honeypot: filled field shows success, nothing sent; hidden field is inert, `tabIndex=-1`, `aria-hidden` | PASS | n/a | n/a |
| Security | Origin: cross-origin and `Origin: null` rejected, same-origin accepted, no leak | PASS | n/a | n/a |
| Security | XSS strings in all text fields: escaped in email HTML, literal in text part, subject untouched, none executed in the page after the failure state | PASS | n/a | n/a |
| Runtime | Console on `/`, a service page, `/request-a-quote`, `/insights`, `/ports`, `/services/nope` | PASS: no errors or warnings; the 404 page logs the expected "Failed to load resource: 404" | Expected | n/a |
| Production | `build` and `start`, all routes served | PASS | n/a | n/a |
| Content | Empty Ports/Insights: pages render, no errors, sitemap omits entries | PASS | n/a | n/a |
| Content | Content validation negative tests (20 cases) | PASS | n/a | n/a |
| Internal links | Crawl from `/`: 15 pages, 0 broken, malformed, empty, `javascript:`, external, `localhost`, `example.com` or query/trailing-slash links | PASS | n/a | n/a |
| SEO regression | Sitemap and robots serve (200); proxy matcher excludes them | PASS | n/a | n/a |

## 6. RFQ test results (detail)

- **Server harness 1 (27 cases):** unconfigured, fully configured, tampering, oversize, honeypot, injection, provider failure, cross-origin, each missing variable, log contents. 27/27.
- **Server harness 2 (95 cases):** every required field empty, whitespace-only and missing; six malformed emails plus CRLF header-injection attempts; five bad phones; every length limit +1 and at the limit; twelve service tamper values (case, whitespace, `__proto__`, arrays, objects, numbers); wrong payload types; malformed, empty, 2 MB and 5 MB bodies; extra fields (`to`, `from`, `bcc`, `subject`, `html`) ignored and never delivered; four injection payloads in eleven text fields; honeypot variants; Origin variants; logs contain no PII or secrets. 95/95.
- **Noted behaviour:** `service` is strict (no trimming or case folding). A malformed or oversized request body returns a framework error (500 or a closed connection) with no stack trace or configuration details and nothing sent. Missing keys return the default "Required" message, which the UI never produces.

## 7. Security-related functional tests

See rows above. No recipient, sender, key or provider text reached any response or the browser. Logs record event codes only.

## 8. Runtime and console findings

No uncaught exceptions, hydration warnings, React warnings, failed resources or server-action errors on the pages listed. Only the expected 404 document-load message on the not-found page (Expected / framework-generated).

## 9. Defects found

| ID | Severity | Defect |
|---|---|---|
| D1 | P2 | `/services/PORT-LOGISTICS` (and any case variant of an existing slug) returned HTTP 200 with the not-found page, `noindex`. |
| D2 | P2 | Malformed percent-escapes under `/services/`, `/ports/`, `/insights/` returned a plain-text 500. |
| D3 | P3 | If the form is submitted before the page has hydrated, the browser performs a native POST to `/request-a-quote` (answered with 405). It was reproduced only when a script submitted the form on an unhydrated page. Not fixed (see section 11). |

## 10. Fixes made

D1 and D2: added `src/proxy.ts` (Next.js 16 Proxy), scoped by matcher to `/services/:slug+`, `/ports/:slug+` and `/insights/:slug+`. It 308-redirects case variants to the lowercase path (query preserved) and rewrites undecodable paths to a path that renders the normal 404. Verified: `/services/PORT-LOGISTICS` returns 308 to `/services/port-logistics`; the malformed paths return 404 with the not-found UI; valid pages, `/request-a-quote` and the sitemap and robots routes are unaffected. No SEO architecture changed.

## 11. Remaining issues

- D3 (P3): a user who submits within the first moments of load, before hydration, gets a bare 405. Making the form submit without JavaScript would need the Server Action as the form action, which is a larger change than this phase allows; no data is exposed (the native POST uses the body, not the URL).
- 5 high-severity audit findings in dev-only lint packages, fixable only with `npm audit fix --force`; left as is.
- Rendering with real port or insight entries was not exercised (collections are intentionally empty).

## 12. Regression results (after the fix)

Lint, typecheck and build pass; `npm audit --omit=dev` 0 vulnerabilities; route and link crawl 0 problems; the 27-case RFQ harness 27/27; sitemap and robots return 200.

## Not performed

- A console capture on every one of the 15 routes (six were captured; the rest were covered by the crawl and the HTML checks).
- A live email test (no credentials exist); success was verified only against the mock provider.
- Real keyboard Tab-order walkthrough (honeypot exclusion was verified from its attributes).
- Visual or responsive QA (Phase 9B).

## 13. Final status

No P0 or P1 defects. Both P2 defects fixed; one P3 documented. Phase 9A: READY FOR PHASE 9B — RESPONSIVE QA.
