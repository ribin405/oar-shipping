# Phase 9D: Performance & Core Web Vitals QA

Date: 2026-10-07. Factual record. All numbers are lab measurements on a local production build; there is no field (real-user) data yet.

## 1. Scope

Production performance of the 15 public routes, with priority on the homepage, a service page, the RFQ page, the services hub and industries. Measured: Core Web Vitals proxies, JavaScript, CSS, fonts, images, network requests, rendering strategy, caching, animation, interaction latency and reduced motion. No code was changed: the audit found nothing that justified a change (section 18).

## 2. Environment

- Production build (`next build`, `next start`) on `localhost:3000`, Windows 11, Node 24, Next.js 16.3.8 (Turbopack), HTTP/1.1 and no CDN (so absolute transfer timings differ from a real host).
- Headless Google Chrome driven over the DevTools protocol by a temporary script (own temporary profile, cold cache, removed afterwards). Mobile profile: 375x812 at 2x scale, 4x CPU slowdown, Slow 4G (1.6 Mbps down, 750 Kbps up, 150 ms latency). Desktop profile: 1440x900, unthrottled.
- Lighthouse 12 run through a temporary `npx` copy (not added to the project) against the same Chrome.
- The in-app browser pane was not used for timing because it reports the page as hidden and does not paint.

## 3. Production build baseline

Lint, typecheck and build pass; build time about 31 s; `npm audit --omit=dev`: 0 vulnerabilities. Output: all content routes are static (`○` or `●` SSG: `/`, `/about`, `/why-oar`, `/services`, six service pages, `/industries`, `/ports`, `/insights`, `/contact`, `/request-a-quote`, `/robots.txt`, `/sitemap.xml`); the only dynamic piece is the Proxy (`ƒ`, matched only on `/services/*`, `/ports/*`, `/insights/*`) and the RFQ Server Action. `/ports/[slug]` and `/insights/[slug]` have no entries.

## 4. Routes covered

Desktop: `/`, `/services/port-logistics`, `/request-a-quote` (3 runs each, median) plus `/services`, `/industries`, `/about`, `/contact` (1 run). Mobile throttled: the same set at 375px, and `/`, `/services/port-logistics`, `/request-a-quote` also at 320, 390 and 430px. The other five service pages share the template with `/services/port-logistics`.

## 5. Core Web Vitals and timing

Lab values from the Chrome measurements (LCP, CLS, FCP, TTFB from Performance Observer and navigation timing; TBT = long tasks after FCP minus 50 ms).

| Metric | Homepage | Service Detail | RFQ | Result |
|---|---:|---:|---:|---|
| LCP, desktop (unthrottled) | 148 ms | 124 ms | 152 ms | Good (<= 2.5 s) |
| LCP, mobile 375 (Slow 4G, 4x CPU) | 1,128 ms | 1,096 ms | 1,012 ms | Good |
| LCP, mobile 320 / 390 / 430 | 1,184 / 1,184 / 1,172 ms | 1,164 / 1,164 / 1,192 ms | 1,040 / 1,132 / 1,052 ms | Good |
| LCP, Lighthouse DevTools throttling (mobile) | 2.0 s | not run | not run | Good |
| LCP, Lighthouse simulated mobile | 2.75 s | 2.7 s | 2.8 s | Borderline (see section 21) |
| CLS (all runs, all widths) | 0 | 0 | 0 | Good (<= 0.1) |
| INP / interaction | Menu open/close: longest event 40 ms (mobile throttled) | n/a | Submit with 10 validation errors and typing: longest event 72 ms mobile throttled, 32 ms desktop | Good (<= 200 ms); event-timing proxy from synthetic input, not true field INP |
| TTFB (local, static) | 5-9 ms | 5-8 ms | 3-5 ms | Not representative of a real host |
| TBT, mobile throttled | 93 ms (2 long tasks, max 418 ms) | 99 ms | 85 ms | Good (< 200 ms) |
| TBT, desktop | 0 ms | 0 ms | 0 ms | Good |
| JS transfer (initial, gzip) | about 148 KB; 180 KB as measured after low-priority prefetches | same | about 148 KB plus the form chunk | See section 6 |
| CSS transfer | 9.5 KB | 9.5 KB | 9.5 KB | Good |
| Image transfer | 25.7 KB (favicon only) | 25.7 KB | 25.7 KB | Good |
| Font transfer | 72.3 KB (2 files) | 72.3 KB | 72.3 KB | Acceptable |
| Request count (desktop, includes prefetches) | 42 | 32 | 33 | See section 11 |
| Request count (mobile 375 throttled) | 32 | 22 | 19 | |
| Total transfer (desktop, incl. prefetches) | 413.9 KB | 360.2 KB | 353.9 KB | |
| HTML document (gzip) | 21.5 KB | 16.9 KB | 10.6 KB | |

Field Core Web Vitals (real users) are not available before launch.

## 6. JavaScript analysis (bundle report)

| Bundle / resource | Raw / gzip | Purpose | Client required? | Action |
|---|---:|---|---|---|
| `3g4px251sg85e.js` | 229 KB / 72 KB | React DOM runtime | Yes | None |
| `2z-e6jheq0ftu.js` | 166 KB / 45 KB | Next.js app-router client runtime | Yes | None |
| `0cz1d0mv5g_q7.js` | 113 KB / 39 KB | Legacy-browser polyfills (`noModule`) | Not fetched by modern browsers | None (framework) |
| `19l5sgdaz5aj1.js` | 110 KB / 31 KB | RFQ form (React Hook Form, Zod, form components) | Only on `/request-a-quote`; prefetched at low priority when a link to it is visible | None (deliberate: speeds up the conversion page) |
| `0x1zrz23vgq31.js` | 31 KB / 10 KB | Header, navigation and icon components | Yes | None |
| `19mx3mg6lkumu.js`, `2rp0_txwy34_u.js`, turbopack runtime, `3s6nzrbk-8mnv.js`, `1efx2tnnok6-g.js` | 1.8-29 KB each | Next.js runtime parts | Yes | None |
| `0akip75u9u-4x.css` | 43.6 KB / 9.1 KB | All site CSS (Tailwind output), one render-blocking request | Yes | None |
| Two WOFF2 files (Inter, Manrope, latin, variable) | 48 KB + 25 KB | Body and heading fonts, preloaded | Yes | None |

- Initial JavaScript for a typical page is about 148 KB gzip (React + Next runtime + app code); app-specific code is small (about 10 KB gzip) and the RFQ form adds about 31 KB gzip only on its own route.
- **Server-only RFQ code is not in the client bundle.** A scan of every file under `.next/static` found 0 matches for `RESEND_API_KEY`, `OAR_RFQ_RECIPIENT_EMAIL`, `OAR_RFQ_FROM_EMAIL`, `resend.com`, `emails.send`, `deliverQuote`, `buildQuoteEmail`, `escapeHtml`, `server-only` and `logRfqEvent`. Only the Server Action reference stub reaches the client. No animation library is installed.
- Dependencies in production: Next, React, React DOM, React Hook Form, `@hookform/resolvers`, Zod, `lucide-react` (tree-shaken icons) and `resend` (server only).

## 7. CSS analysis

One 43.6 KB (9.1 KB gzip) stylesheet shared by every page, loaded once and cached; no per-route CSS, no unused CSS flagged by Lighthouse (`unused-css-rules` passes). It is render-blocking by nature (about 50 ms estimated by Lighthouse). No change.

## 8. Image analysis

The site publishes no content images; the logo is a CSS mask over `oar-logo.png`. The only image request is `favicon.ico` (25.9 KB, approved branding, loaded after the page). Hero and service image slots are intentionally unset, so there is no image to size, prioritise or lazy-load. The LCP element on every route is text, so no image priority work applies. When approved images are added they should use `next/image` (already used by the media component), explicit sizes and `preload` only for the hero.

## 9. Font analysis

`next/font/google` (self-hosted at build time, no request to Google at runtime), Latin subset only, `display: swap`, automatic fallback metrics. Inter and Manrope are variable fonts (about 73 KB together), preloaded on pages that use them (not on the not-found page). CLS measured 0 on every route, so font swap causes no layout shift. No unused weights are loaded because the files are variable. No change.

## 10. Client component analysis

Five `"use client"` files: `quote-form.tsx` (state, React Hook Form), `mobile-navigation.tsx` (menu state, keyboard handling), `nav-link.tsx` (`usePathname` for the current-page state), `header-scroll-state.tsx` (a 1 px IntersectionObserver sentinel, no re-renders) and `error.tsx` (required by the error boundary). Each needs client behaviour; everything else is a Server Component. Nothing to convert. Hydration of the homepage (804 DOM nodes) produced a longest task of 418 ms only under 4x CPU slowdown (TBT 93 ms).

## 11. Network analysis

- No third-party or external request on any route (the external-request list was empty on every run); no analytics, tracking, embeds or CDN resources; no development URLs.
- Critical path: HTML, then the stylesheet; fonts are preloaded in parallel; scripts are `async`.
- After load, Next.js prefetches linked routes at low priority: 17 requests (about 56 KB) on inner pages and 27 (about 105 KB) on the homepage on desktop; 3-17 on mobile because fewer links are in view. This includes the 31 KB RFQ chunk. It happens after the content is painted, does not affect LCP, and makes navigation faster, so prefetching was left enabled (not disabled globally, per the brief).

## 12. Rendering strategy

All content pages are prerendered static HTML, served with `Cache-Control: s-maxage=31536000` and an ETag. The Proxy runs only on the three dynamic-content route families, adding a few milliseconds. The RFQ is a Server Action POST and is not cached.

## 13. Caching

Hashed assets under `/_next/static/` are served `public, max-age=31536000, immutable` (scripts, CSS, fonts). HTML is cacheable by shared caches and revalidated by browsers via ETag. Server Action responses and RFQ data are not cached. No cache headers were changed.

## 14. Animation

No animation library. The only motion is: hover border/shadow transitions on cards (200 ms, paint only), a link arrow nudge (transform), a spinner (`motion-safe:animate-spin`, transform), and smooth scrolling. No layout-affecting animation, no filters, blur or backdrop effects, no scroll-driven animation. `document.getAnimations()` returned 0 on load.

**Reduced motion (runtime, via emulation):** with `prefers-reduced-motion: reduce` emulated, `scroll-behavior` is `auto`, card and link transitions are `1e-05s`, and the page renders and works; without it, scrolling is `smooth` and card transitions are `0.2s`. This upgrades Phase 9C's source-only review to a runtime check (emulated media feature, not an operating-system setting).

## 15. Mobile performance

At 320, 375, 390 and 430px (4x CPU, Slow 4G, cold cache): FCP = LCP 1.0-1.2 s on the three key routes, CLS 0, TBT 81-122 ms, load event about 1.8-1.9 s. The menu opens and closes (state verified) with the longest event 40 ms; the RFQ validates ten fields and accepts typing with the longest event 72 ms.

## 16. Desktop performance

At 1440px: LCP 104-152 ms on seven routes, CLS 0, TBT 0, load 62-119 ms. The DOM is small (284-804 nodes, maximum depth 14). Widths 1280 and 1920 do not load additional assets (there are no images or desktop-only resources), so they were not measured separately.

## 17. Lighthouse (12, headless Chrome, localhost)

| Page (mode) | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Home (mobile) | 96 | 96 | 100 | 63 (unconfigured origin) / 100 (configured origin) |
| Service page (mobile) | 96 | 100 | 100 | 63 / 100 |
| RFQ (mobile) | 96 | 100 | 100 | 63 |
| Home (desktop) | 100 | 96 | 100 | 63 |
| Service page (desktop) | 100 | 100 | 100 | 63 |
| RFQ (desktop) | 100 | 100 | 100 | 63 |

- SEO 63 is the intended Phase 8F behaviour: with `NEXT_PUBLIC_SITE_URL` unset, pages are `noindex` and Lighthouse reports "Page is blocked from indexing". With a configured test origin the home and service pages scored SEO 100 (performance 95 and 96, accessibility 96 and 100), confirming no SEO regression.
- Accessibility 96 on the homepage is the known decorative card numerals (Phase 9C P3).
- Simulated mobile LCP is 2.7-2.8 s (borderline); see section 21.

## 18. Defects found

None at P0, P1 or P2. Observations (P3, documented, not changed):

| Ref | Observation |
|---|---|
| O1 | Lighthouse's simulated mobile LCP is 2.7-2.8 s (above the 2.5 s "good" line) although the measured values are far lower: 0.13 s unthrottled (observed), 1.0-1.2 s with real Slow 4G + 4x CPU throttling, 2.0 s with Lighthouse's DevTools throttling. The LCP element is text; the simulation includes a pessimistic request-latency model on a single HTTP/1.1 connection. |
| O2 | Low-priority prefetching adds 56-105 KB after load on desktop (including the 31 KB RFQ chunk). |
| O3 | `favicon.ico` is 25.9 KB (approved branding asset). |
| O4 | Lighthouse notes about 59 KiB "unused JavaScript" and 13 KiB "legacy JavaScript"; these are the prefetched RFQ chunk and framework polyfill code, not application code. |

All four are P3 (low severity).

## 19. Fixes made

None. Each candidate was weighed against measured effect: inlining CSS (about 50 ms by Lighthouse's own estimate, experimental flag), disabling or narrowing prefetch (no measured LCP/INP cost), re-encoding the favicon or changing fonts (branding and typography are approved and CLS is already 0). None meets the "measure first, avoid speculative change" bar.

## 20. Before and after

Not applicable: no change was made, so the figures in section 5 are the baseline for later comparison.

## 21. Remaining issues and recommendations

- Validate LCP on the real host (HTTP/2 or HTTP/3, Brotli, CDN) and with real-user data after launch; the borderline simulated mobile LCP is the number to watch.
- If real-user LCP on slow mobile networks is above 2.5 s, the candidates in order of expected effect are: reducing the two preloaded fonts to the weights actually used, inlining the 9 KB stylesheet, and trimming prefetch for footer links.
- Add real-user monitoring only as part of the later analytics decision (none added here).

## 22. Regression testing

No code changed, and checks were rerun after the measurements: 15 routes return 200; invalid routes return 404; `/services/PORT-LOGISTICS` redirects (308); a malformed escape returns 404; the 27-case RFQ server harness passes 27/27; interaction runs confirmed the mobile menu (open and close) and RFQ validation (10 errors, typing) still work; lint and typecheck pass; production build passes; `npm audit --omit=dev`: 0 vulnerabilities. Phase 9B and 9C fixes were not touched. Reduced-motion behaviour confirmed at runtime by emulation.

## Not performed

- Field (real-user) Core Web Vitals.
- Real-device or real-network measurement; browsers other than Chrome.
- True INP (the interaction figures are Event Timing durations from synthetic input).
- A full visual regression screenshot comparison (no code changed).

## 23. Final status

Phase 9D: complete. No P0, P1 or P2 defects. READY FOR PHASE 9E.
