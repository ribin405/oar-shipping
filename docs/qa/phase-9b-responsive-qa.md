# Phase 9B: Responsive QA

Date: 2026-10-07. Factual record of what was run; limits are stated in section 2 and "Not performed". No code was changed in this phase.

## 1. QA scope

All 15 public routes plus the not-found shell, at nine required widths, boundary widths around every Tailwind breakpoint the project uses, and four landscape sizes. Focus: horizontal overflow, clipping, headings, navigation switching, the mobile menu, the RFQ form (idle, validation errors, failure and success states), grids, and container width.

The project uses Tailwind's default breakpoints (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536); the content container is `max-w-content` (1320px at wide viewports) with `px-4 md:px-6 lg:px-8`. The desktop header and navigation appear at `lg` (1024); below it the menu button is used.

## 2. Browser and environment

Production build (`next build`, `next start`) on `localhost:3000`, Windows 11, in-app Chromium browser pane. Mock email provider used for the form success state (no real email).

Method: each route was loaded in a same-origin iframe sized to the exact CSS width (iframe scrollbar hidden, so the viewport equals the stated width) and measured with a temporary script. The in-app browser does not fire `requestAnimationFrame`, which holds the page's Suspense content back, so the script released it with React's own reveal function before measuring; page heights (for example the homepage at about 14,800px at 320) confirmed full rendering. Only Chromium (the in-app browser) was used. No Edge, Firefox, Safari or physical device was available or tested.

Measured per page and width: `documentElement` and `body` scrollWidth versus clientWidth, any visible element extending past the viewport edge (unless inside a clipping container that is itself within the viewport), text clipped by `overflow:hidden`, H1 bounds and height, header mode, buttons or inputs under 32px, and element counts (to detect a page that failed to render).

## 3. Viewports tested

Required: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920.
Breakpoint boundaries: 639, 640, 767, 1023, 1279, 1535, 1536.
Landscape: 568x320, 667x375, 844x390, 1024x768.
Mobile-menu sizes: 320x568, 320x700, 375x667, 390x844, 430x932, 667x375, 844x390, 768x1024, 1023x768.

## 4. Pages tested

`/`, `/about`, `/why-oar`, `/services`, `/industries`, `/ports`, `/insights`, `/contact`, `/request-a-quote`, the six `/services/*` pages, and the not-found shell (`/zzz`, same template as `/services/nope`, `/ports/nope`, `/insights/nope`).

## 5. Required viewport result matrix

Every cell below was measured. PASS means no horizontal overflow (page and body), no clipped text, H1 within the viewport, and the page fully rendered.

| Route / area | 320 | 375 | 390 | 430 | 768 | 1024 | 1280 | 1440 | 1920 |
|---|---|---|---|---|---|---|---|---|---|
| Homepage | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Header | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Mobile menu | PASS | PASS | PASS | PASS | PASS | n/a (desktop nav) | n/a | n/a | n/a |
| Services | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Service detail (6) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Industries | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Ports (empty) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Insights (empty) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| About | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Why OAR | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Contact | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Request a Quote | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Footer | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Not-found shell | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

Header mode: menu button at every width up to 1023; the six desktop links plus the CTA from 1024 up, with no overlap (gap between logo and first link 90px at 1024, 220px at 1280).

## 6. Overflow report

For every route at all 9 required widths, 7 boundary widths and 4 landscape sizes (about 330 page/width measurements):

```
documentElement.scrollWidth == clientWidth (== requested width)
body.scrollWidth == body.clientWidth
Overflow: none
Elements past the viewport edge (unclipped): none
Text clipped by overflow:hidden: none
Root cause / fix: not applicable
```

Representative values: 320 -> 320/320 on all routes; 1920 -> 1920/1920. Rendered page heights at 320 (for example `/` 14,828px, `/services/port-logistics` 10,889px) confirm full content was measured.

## 7. Homepage

All sections rendered and fit at every width. At 320 the hero H1 ("Creators of Calm Port Calls", 2 lines) and both CTAs fit (stacked, full width), and the eyebrow wraps inside its frame. The Supplier -> OAR -> Vessel flow stacks into three cards with connectors (Supplier Door, Coordination and Execution with its five activities, Vessel Deck), all within the container, so the concept stays readable on mobile. At 1920 the content stays inside the 1320px container and no paragraph spans the full width (widest body paragraphs 766-816px).

## 8. Header and mobile menu

Open at nine viewport sizes (including landscape 667x375 and 844x390): the panel is fixed below the header, spans the viewport, has `overflow-y: auto`, all items and the Request a Quote button fit horizontally, and the button can be reached by scrolling the panel where the viewport is short (320x568: content 510px in a 504px panel; 667x375: 510px in 311px). Opening sets `body overflow: hidden`; Phase 9A verified Escape, link click, CTA click and repeated cycles release it. At 768-1023 the menu CTA stretches across the full panel width (720-975px); this is the existing design and was left unchanged (P3 observation).

## 9. Service pages

All six render at every width with single H1s up to four lines at 320 (the longest, Port Coordination and Warehousing, 240px tall) inside the viewport. Related-service cards: 1 column on mobile, 2 on tablet, up to 4 on wide desktop, with no clipping.

## 10. RFQ form

Tested at 320, 375, 390, 430, 768, 1024, 1280 and 1440:

- 14 controls fit the viewport at every width (one column below 768, two columns from 768).
- Labels fit; control height at least 40px; the submit button is 48px high and full width on mobile (288/343/358/398px), 174px on tablet and desktop.
- Validation: submitting empty flags all ten required fields; error messages fit their columns, none overlap neighbouring controls, focus goes to the first field, and the page stays at the viewport width.
- Failure alert (unconfigured server) fits at all eight widths; the button re-enables.
- Success panel (mock provider) fits at 320, 375, 768 and 1440, including its "Submit another request" button.

## 11. Breakpoint transitions

Boundary widths 639/640, 767, 1023, 1279, 1535/1536 show no jumps that break layout: the header switches once (menu below 1024, desktop navigation from 1024), grids step cleanly, and the RFQ form changes from one to two columns at 768. No page shows an awkward single-item column at 768 or 1024.

## 12. Orientation

568x320, 667x375, 844x390 (mobile landscape) and 1024x768: no overflow on any route. The hero uses a minimum height (not a fixed height), so in short landscape viewports it grows taller than the screen instead of clipping, and the page scrolls. The mobile menu scrolls in landscape.

## 13. Other checks

- Typography: no visible text below 12px on any route at 320.
- Controls: no button, input or select under 32px in either dimension at any tested width.
- Footer links on mobile are 17px tall text links spaced about 36px apart (row pitch); sufficient for the layout, with a target-size review left to Phase 9C.
- Images: the site publishes no content images; the logo is a CSS mask with a fixed aspect ratio (82x32 at the header size) and stays proportioned.
- Decorative elements (technical grid, connectors, gradients) caused no overflow at 320.
- Empty Ports and Insights pages keep intentional layouts at all widths with no oversized empty region.

## 14. Defects found

None. No P0, P1, P2 or P3 responsive defects were found by the measurements above.

## 15. Fixes made

None. No source, content, style or configuration file was changed in this phase.

## 16. Remaining issues and observations (P3, no change made)

- The hero eyebrow pill wraps onto two lines at 320 with the separator dot mid-row; it stays inside its frame.
- The mobile-menu CTA is very wide at 768-1023 (existing design).
- Footer text links are 17px tall (target-size review belongs to Phase 9C).

## 17. Regression testing (after this phase, no code changed)

Lint, typecheck and build pass; `npm audit --omit=dev` reports 0 vulnerabilities; all 15 routes return 200; `/services/nope`, `/ports/nope`, `/insights/nope`, `/zzz` and `/api/quote` return 404; `/services/PORT-LOGISTICS` redirects (308) to the lowercase path and a malformed escape under `/ports/` returns 404 (the Phase 9A proxy is intact); the 27-case RFQ server harness passes 27/27; the RFQ double-submit, honeypot and validation behaviour from Phase 9A are unchanged because no code changed.

## Not performed

- Browsers other than the in-app Chromium, physical devices and real touch input.
- Full-page visual screenshot review at every width (only a 320px homepage hero screenshot was reliable in the emulated pane; layout was verified by measurement).
- Browser text-zoom and font-scaling behaviour.
- Full WCAG audit (Phase 9C).

## 18. Final status

Phase 9B: complete. READY FOR PHASE 9C (ACCESSIBILITY QA).
