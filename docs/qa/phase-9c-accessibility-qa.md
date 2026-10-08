# Phase 9C: Accessibility & WCAG QA

Date: 2026-10-07. Factual record; limits are listed under "Not performed".

## 1. Scope

All 15 public routes and the not-found shell. Shared components were tested thoroughly (header, mobile menu, footer, breadcrumbs, cards, accordion, buttons, form field components, skip link) and each unique page structure was spot-checked; every route was run through an automated audit.

## 2. WCAG target

WCAG 2.2 Level AA (principles: Perceivable, Operable, Understandable, Robust).

## 3. Environment

Production build on `localhost:3000`, in-app Chromium. Tools: axe-core 4.10.2 (loaded temporarily from a public CDN into the browser session only; no dependency was added, nothing was installed, and the cached copy was cleared afterwards), real keyboard events through the browser tool, and computed-style and DOM inspection. No screen reader was available.

Tool limitation: the browser pane does not run `requestAnimationFrame` and, outside a freshly opened tab, reports the document as hidden, which stalls page hydration. Pages were therefore audited in same-origin iframes at exact widths with their suspended content released, and the interactive tests were run in a freshly opened tab after confirming hydration.

## 4. Routes audited

All 15 routes plus the not-found shell at 1440px; `/`, `/services`, `/services/warehousing`, `/industries`, `/request-a-quote`, `/about`, `/contact` and not-found at 375px; the open mobile menu at 375 and 320px; the RFQ form with ten validation errors and with the failure alert.

## 5. Test matrix

| Area | Test | Result | Severity | Fix |
|---|---|---|---|---|
| Landmarks | Exactly one `header`, `main`, `footer` on every audited page; navs: Primary, Breadcrumb, Footer; only one Primary nav is exposed at a time (the other is `display:none` or `hidden`) | PASS | n/a | n/a |
| Landmarks | RFQ guidance box was an `<aside>` nested in `<main>` (axe `landmark-complementary-is-top-level`) | FIXED | P3 | Changed to a plain `div`; its `h2` remains |
| Headings | One H1 per page, no skipped levels, no empty headings (axe `heading-order`, `page-has-heading-one`, `empty-heading`) | PASS | n/a | n/a |
| Language/title | `lang="en"`; unique, meaningful `<title>` on every route | PASS | n/a | n/a |
| Skip link | First Tab stop; shows on focus; Enter moves focus to `main#main-content` | PASS | n/a | n/a |
| Skip link | Revealed link lost its padding (130x16) | FIXED | P3 | `focus:px-4 focus:py-2` (now 162x32) |
| Keyboard | Header, breadcrumb, hero CTA and card links in logical order (real Tab presses); no traps | PASS | n/a | n/a |
| Keyboard | Full RFQ completed with the keyboard only (typing, Tab, ArrowDown on the select, Enter to submit) | PASS | n/a | n/a |
| Focus | Visible ring on every element tested (2px Ocean on light, Signal Cyan on dark; cards ring the whole card via `:has(a:focus-visible)`); only `outline-none` uses are the stretched card link (card rings instead) and programmatic focus targets (`main`, success heading) | PASS | n/a | n/a |
| Focus | Accordion (FAQ) summary ring was drawn outside an `overflow:hidden` wrapper and clipped at its edges | FIXED | P2 | `focus-visible:-outline-offset-2` (verified under real keyboard focus: 2px solid, offset -2px) |
| Mobile menu | Button named "Menu"/"Close", `aria-expanded`, `aria-controls`; closed panel has `hidden`; Enter opens; Tab enters the panel; Escape closes and returns focus to the button; Tab continues to the next page control; scroll lock released | PASS | n/a | n/a |
| Links | Descriptive names; card links "Explore service: Port Logistics" (visually hidden suffix) | PASS | n/a | n/a |
| Buttons/controls | All interactive controls have accessible names (axe `link-name`, `button-name`, `label`) | PASS | n/a | n/a |
| Images | No content images are published; logo is a CSS-masked decoration inside a link with `aria-label` "OAR Shipping home"; icons are `aria-hidden` | PASS | n/a | n/a |
| Forms | 14 controls: visible `<label>` bound to each, `fieldset`/`legend` groups, native `required`, `type` email/tel/datetime-local/date, `inputmode`, valid `autocomplete` tokens (name, organization, email, tel, country-name) | PASS | n/a | n/a |
| Forms | Required state: native `required` plus visible "*" (hidden from AT) and the note "Fields marked * are required." | PASS | n/a | n/a |
| Forms | Errors: ten errors each set `aria-invalid` and `aria-describedby` to a visible text message; focus moves to the first invalid field; errors clear on valid input; axe clean in this state | PASS | n/a | n/a |
| Forms | Failure alert: `role="alert"`, generic text, form values kept, retry by keyboard; axe clean. Success panel: `role="status"` with the heading focused (tested in Phase 9A) | PASS | n/a | n/a |
| Contrast | axe on 15 routes plus states; manual calculation for gradient/overlap cases axe could not resolve (see section 6) | PASS with notes | see 6 | Badge tint reduced |
| Color only | Errors have text and `aria-invalid`; required has "*" and text note; active nav has `aria-current`; status messages are text | PASS | n/a | n/a |
| Touch | Footer links were 17px tall | FIXED | P2 | `inline-block py-2` (now 36px tall; row pitch unchanged) |
| Touch | Header, menu, breadcrumb (48px), CTA (48px) and form control (40px+) targets | PASS | n/a | n/a |
| Zoom | 200% zoom (720 CSS px) and 400% (360 CSS px) on 7 representative routes: no horizontal scroll, no clipped text | PASS | n/a | n/a |
| Text spacing | WCAG 1.4.12 overrides at 375 and 1440: no overflow or clipping | PASS | n/a | n/a |
| Motion | Source review: global `prefers-reduced-motion` safety net plus `motion-safe:` on spinners and arrow movement; smooth scrolling disabled for reduced motion; no autoplay or moving content | PASS (by inspection) | n/a | n/a |
| ARIA | All `aria-labelledby`/`describedby`/`controls` references resolve; no duplicate IDs; no positive `tabindex`; no role overrides on native controls; `aria-hidden` only on decorative content | PASS | n/a | n/a |
| FAQ / details | Native `<details>`/`<summary>`, Enter/Space operable, no custom JavaScript | PASS | n/a | n/a |
| Breadcrumbs | `nav aria-label="Breadcrumb"`, ordered list, `aria-current="page"`, separators `aria-hidden` | PASS | n/a | n/a |
| 404 | H1 "Page not found", header, footer, "Back to homepage" link, axe clean, no redirect | PASS | n/a | n/a |
| Automated | axe 4.10.2 (WCAG 2.0/2.1/2.2 A and AA plus best practices) on 16 routes at 1440, 8 at 375, menu open at 375/320, RFQ error and failure states | PASS after fixes (see 6 for the decorative-numeral exception) | n/a | n/a |

## 6. Contrast detail

- axe violations found: (1) neutral badge text on a lightly tinted background, 4.37:1 at 12px on the homepage insights topics and `/insights`; fixed by reducing the badge tint from 5% to 3% (now 4.54:1). (2) Decorative card index numerals "01"-"06", `aria-hidden`, colour `--border` (#D9E1E5) on white, 1.32:1.
- The numerals are purely decorative ordinals: they are hidden from assistive technology, carry no information (the cards are already in a list in that order), and WCAG 1.4.3 exempts text that is pure decoration. They were left unchanged to avoid altering the approved look and are reported by axe as `color-contrast` on six pages (`/`, `/services`, `/industries`, `/about`, `/ports`). Recorded as P3.
- axe could not resolve backgrounds for text over the hero radial gradient and the technical-grid overlays (about 50 "needs review" nodes). Worst cases were calculated from the design tokens instead: white 13.4:1, muted text 7.6:1, Signal Cyan 5.7:1 on the brightest point of the hero gradient; muted on deep navy and on dark cards 7.9-9.0:1; white on primary buttons 7.0:1 (4.6:1 on hover); links 6.5-7.0:1 on light surfaces; error text 6.5:1; placeholders 4.8:1; control borders 3.08:1; focus rings 4.3-7.8:1.
- Observation (P3, unchanged): the secondary button's edge uses the light border colour (1.3:1 on white). The button is identified by its text, and non-text contrast applies only where the boundary is the sole identifier, so it was left as designed.

## 7. Screen reader and accessibility tree

No screen reader was available, so none was tested. The accessibility tree was reviewed through axe (name, role and relationship rules) and the browser's accessibility snapshot of a service page (landmarks, links, names). The card link names were checked through their text content ("Explore service: Port Logistics"); the snapshot tool displayed only the visible part, which was not a defect in the markup.

## 8. Defects found and fixes

| ID | Severity | Defect | Fix |
|---|---|---|---|
| A1 | P2 | FAQ summary focus ring clipped by its `overflow:hidden` wrapper | Inset the ring (`src/components/ui/accordion.tsx`) |
| A2 | P2 | Neutral badge text 4.37:1 on its tinted background | Tint 5% to 3% (`src/components/ui/badge.tsx`) |
| A3 | P2 | Footer text links only 17px tall on touch devices | `py-2`, list gap removed (`src/components/layout/footer.tsx`) |
| A4 | P3 | Skip link lost its padding when revealed | Added `focus:px-4 focus:py-2` (`src/components/layout/page-shell.tsx`) |
| A5 | P3 | RFQ guidance box was a nested complementary landmark | Changed to `div` (`src/app/request-a-quote/page.tsx`) |

No P0 or P1 defects.

## 9. Remaining issues (P3, unchanged)

- Decorative card numerals below 3:1 (exempt as pure decoration, see section 6).
- Secondary button border contrast (see section 6).
- The mobile-menu CTA is very wide at 768-1023px (existing design; not an accessibility defect).
- Pre-hydration form submission (Phase 9A D3) still falls back to a native POST.

## 10. Regression testing

- Phase 9A: 15 routes return 200; invalid routes return 404; case variants redirect (308) and malformed escapes return 404; RFQ server harness 27/27; the keyboard-only RFQ run produced one request and the generic failure alert with values kept.
- Phase 9B: overflow re-checked after the changes: none at 320, 375, 430, 768, 1024 and 1440 across all 16 pages; footer height at 375 unchanged (1,117px).
- Lint, typecheck and build pass; `npm audit --omit=dev` reports 0 vulnerabilities.

## Not performed

- Screen reader testing (NVDA, JAWS, VoiceOver, TalkBack).
- Reduced-motion with the operating-system preference actually enabled (the pane cannot toggle it; reviewed in source).
- Browsers other than the in-app Chromium; physical touch devices.
- Browser "default font size" enlargement (only equivalent zoom widths and text-spacing overrides were tested; a root font-size override with unchanged breakpoints is not a representative test because rem media queries follow the browser default size).
- Chrome autofill popups: during one synthetic typing run the country field's autofill suggestion swallowed a Tab; normal Tab behaviour was confirmed immediately afterwards and in the later full run, so it was treated as a test-tool artifact.

## 11. Final status

Phase 9C: complete. READY FOR PHASE 9D (PERFORMANCE QA).
