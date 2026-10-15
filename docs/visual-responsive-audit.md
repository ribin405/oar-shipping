# OAR Shipping: Visual and Responsive Audit

Audit date: 2026-10-13  
Scope: Phase 1 planning audit. No application source, routing, form, Server Action, SEO, or security configuration was changed. This document is an implementation plan, not a redesign implementation.

## 1. Executive summary

OAR already has a production-oriented Next.js App Router site with a coherent token system, shared page bands and card/form components, conservative service copy, and source-level safeguards for reduced motion, keyboard access, metadata, and content validation. The architecture does not call for a rebuild. A visual redesign should refine the current system and retain its verified route/content sources.

The highest-value visual opportunity is the imagery. The current homepage hero uses `/images/hero/golden harbour 2.png` (2,287,243 bytes), and all six service records reference images. The asset library also contains five industry photos and one satellite coastline photo. This differs from the October 7 responsive, accessibility, and performance QA records, which say there were no content images and no image requests. The route/interaction results in those reports are useful historical evidence; their image/performance conclusions are stale for the current source. The configured images have not been rendered in this audit, and their licensing, origin, and geographic specificity are not verified here.

The content structure is intentionally extensive on service detail pages: hero, problem, OAR role, coordination activities, process, requirements, industries, related services, FAQs, and CTA. Preserve the details needed to understand each service, while tightening repeated explanations and prioritizing the most decision-useful content on mobile. The homepage likewise has eleven ordered sections; keep the differentiating supplier-to-vessel story and reduce duplicated positioning only after a content review.

No P0 or P1 *rendered defect* is confirmed by this source audit. The existing responsive and accessibility QA records report no P0/P1 findings when they were run. P1 items below are release/design gates for unresolved current assets and content validation, not claims of an observed browser defect.

## 2. Verified route inventory

Inventory derived from `src/app`, route helpers, and content collections—not assumed from a prior list.

| Route / route family | Current state | Source |
|---|---|---|
| `/` | Homepage | `src/app/page.tsx` |
| `/about` | About page | `src/app/about/page.tsx` |
| `/why-oar` | Why OAR page | `src/app/why-oar/page.tsx` |
| `/services` | Services overview | `src/app/services/page.tsx` |
| `/services/port-logistics` | Service detail | Generated from six-service collection |
| `/services/vessel-delivery` | Service detail | Generated from six-service collection |
| `/services/customs-clearance` | Service detail | Generated from six-service collection |
| `/services/warehousing` | Service detail | Generated from six-service collection |
| `/services/cargo-transportation` | Service detail | Generated from six-service collection |
| `/services/port-coordination` | Service detail | Generated from six-service collection |
| `/industries` | Industries overview | `src/app/industries/page.tsx` |
| `/ports` | Ports overview; verified port collection currently empty | `src/app/ports/page.tsx`, `src/content/ports/index.ts` |
| `/ports/[slug]` | Dynamic template; currently no generated entries | `src/app/ports/[slug]/page.tsx` |
| `/insights` | Insights overview; approved insight collection currently empty | `src/app/insights/page.tsx`, `src/content/insights/index.ts` |
| `/insights/[slug]` | Dynamic template; currently no generated entries | `src/app/insights/[slug]/page.tsx` |
| `/contact` | Contact page; public contact channel fields are intentionally unset | `src/app/contact/page.tsx`, `src/config/contact.ts` |
| `/request-a-quote` | RFQ page and form | `src/app/request-a-quote/page.tsx` |
| `/design-system` | Development-only reference route; excluded in production by `next.config.ts` page extensions | `src/app/design-system/page.dev.tsx` |
| Not-found and error UI | Shared App Router not-found/error surfaces, not public content routes | `src/app/not-found.tsx`, `src/app/error.tsx` |

There are 15 current public content routes (home, 8 static interior routes including the services overview, and 6 service details). Port and insight detail templates exist but generate zero routes until verified content is added. Do not create empty/filler detail pages.

## 3. Shared-component findings

### Verified from source

- `src/app/globals.css` defines brand colors, semantic surface roles, type scale, radii, shadows, focus styling, spacing behavior, and responsive rules. Tailwind CSS 4 is configured through CSS; there is no separate Tailwind JS config in the route/source inventory.
- `Container`, `Section`, `SectionHeader`, `InnerPageHero`, `MediaFrame`, `Card`, `Button`, `ArrowLink`, and typed card components provide a consistent composition vocabulary.
- Header navigation reads one shared config. Desktop navigation and the mobile disclosure switch at 1024px (`lg`). Header is sticky; homepage uses CSS overlay behavior on its full-bleed dark hero.
- The mobile menu uses a labelled disclosure button, `aria-expanded`/`aria-controls`, Escape close, scroll locking, and closes on navigation or a switch to desktop size.
- Footer is a responsive grid with service/company/contact columns. Legal links are omitted because the configured list is empty. Contact details are omitted unless verified values exist.
- The service detail template and six service records are data-driven. Native `<details>/<summary>` is used for FAQs. Port and insight templates are similarly data-driven and strict about unknown slugs.
- The homepage sequence is hero, capability strip, problem, supplier-vessel flow, services, ports, industries, Why OAR, trust, insights, and final CTA.
- The home hero image is configured now. The hero uses `preload` through Next Image; local files are optimized via `next/image` and Next config allows AVIF/WebP output.
- `HomePreloader` introduces a CSS overlay with an 820ms delay and 520ms exit. Its CSS has a reduced-motion rule, but the page still includes an initial branded waiting state when motion is reduced. The October performance report predates the current asset configuration and cannot validate this current first paint.
- SEO source is centralized: pages use `buildPageMetadata`, root metadata sets the title template, `robots.ts` and `sitemap.ts` are generated from `siteConfig` and canonical content collections, and JSON-LD is emitted for the homepage and service detail pages. The social image is currently unset. No SEO change is proposed in this visual phase.
- `next.config.ts` sets the image formats and response security headers; `src/proxy.ts` handles case normalization, malformed paths, and unsupported methods on dynamic slug routes. Prior security QA documents these behaviors. This phase does not alter security configuration.

### Design recommendations

- Preserve one strong primary action per opening band; use secondary links sparingly and consistently. On small screens, keep the primary CTA visible without requiring a long scroll through hero copy.
- Align image frame ratios, radii, overlays, and focal points across service and industry cards. At present, assets are assigned individually and some cards have custom reference/featured treatments in global CSS; review whether those exceptions strengthen hierarchy or create a page-to-page style shift.
- Reassess the preloader after observing a current production build with images enabled. It is ornamental rather than required to understand or use the homepage; ensure it never delays access to the hero or makes repeat visits feel slower.
- Keep the empty-state pages useful and honest. `/ports` explains that specific locations are only published when confirmed; `/insights` presents topics rather than fake article cards. The Contact page intentionally avoids guessed channels.

## 4. Mobile findings

### Verified historical viewport record

`docs/qa/phase-9b-responsive-qa.md` records an October 7 production-build Chromium audit at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 CSS pixels, plus breakpoint boundaries and landscape sizes. It reports no horizontal overflow, clipping, or out-of-viewport headings on those routes at that time. It also reports that hero CTAs stack full width at 320, the 320px hero eyebrow wraps, and the menu panel scrolls when its content exceeds short landscape heights. Those findings are historical and were not re-rendered here.

### Source-based recommendations, not current rendered defects

- At 320–430px, favor short lead descriptions and clear line breaks while keeping service definitions intact. Several service hero titles are long; use actual crop/line-wrap review before changing copy.
- Service detail pages contain many sections and extensive requirements/FAQ material. Keep the full explanation available, but prioritize role, scope, key requirements, and a quote action before secondary cross-links. Consolidate repeated supplier-to-vessel descriptions only with a copy review.
- Use landscape crops for service/industry imagery that retain a recognizable subject at narrow widths. Verify `object-position` per asset at 320, 390, and 430px; a desktop crop that shows a ship or container may conceal it on mobile.
- Retain readable body text and controls. Existing source tokens and the October responsive/accessibility reports describe 16px body text and controls at least 40px high; preserve those floors during visual tuning.
- Keep the single-column card layout below `md`, two columns from 768px, and wider grids where their content supports them. Avoid forcing multi-column text cards into cramped 320–430px layouts.
- In the RFQ form, preserve the existing one-column mobile flow, visible labels, grouped controls, field-level errors, and full-width submit action. The brief explicitly excludes changing its form behavior in this phase.
- A 56px floating WhatsApp control is fixed at the lower right. Existing reports say tested control size/overflow passed, but the current WhatsApp destination and business contact authorization are outside this UI audit; visually ensure it does not cover focused controls or important content on short screens.

## 5. Tablet findings

The recorded responsive QA says 768px transitions the RFQ form to two columns and 1024px switches from mobile menu to desktop navigation, with no measured overflow at those widths. Source rules also move card grids from one to two columns at `md`, and from two to three at `lg` (four service cards at `lg` in relevant service grids; industry grid changes to four columns at `xl` when all four audiences are shown).

Recommendations for 768, 820, and 1024px:

- Inspect hero copy/image balance and every card ratio at 768/820; check odd item counts so no lone card appears visually stranded. Current industry grid code explicitly spans some last cards to fill rows, which should be preserved unless a new grid is rendered and reviewed.
- At 1024px the desktop navigation is active. Confirm the logo, seven primary links, and CTA still have comfortable gaps at exactly 1024 and when browser text zoom is used. The historical report measured 90px between logo and first link at 1024, but that may change with fonts/assets or content.
- The mobile menu CTA spans its panel width from 768–1023 by design; the prior responsive report records it as a low-priority visual observation, not a defect.
- Review tablet section rhythm and image emphasis; do not simply scale desktop spacing down. Preserve the single-column service-detail text rhythm until the content width makes a second column useful.

## 6. Desktop findings

The design system sets a 1320px content maximum and container gutters of 16/24/32px across default/`md`/`lg`; headings scale at `md`; header navigation starts at `lg`; card grids expand across breakpoints. The prior responsive QA reports the 1920px layout remained within the content container and body paragraphs were about 766–816px wide. It also says there was no horizontal overflow at the tested desktop sizes.

Recommendations:

- Use the hero image as a supporting visual with intentional negative space for copy, and retain readable text contrast over the image. The selected hero asset appears to have open sky/water on the left and a ship/terminal scene on the right; current source sets `object-[100%_center]`. Inspect the rendered crop and overlay at 1280, 1440, and 1920 before adjusting.
- Establish consistent image rhythm among the hero, service pages, and industry cards. Inner-page heroes currently have no visual on About/Why OAR/Industries/Ports/Insights/Contact/RFQ; adding images there is a design choice requiring licensed/approved assets, not an assumed requirement.
- Review page length and repeated CTA frequency on six detail pages and the homepage at 1280–1920. Keep service scope, process, and requirements; remove only duplicative phrasing approved by the content owner.
- Use cyan as a restrained action/focus accent, as the existing palette intends. Avoid adding large competing cyan blocks or decorative treatments that lower text/image contrast.

## 7. Accessibility findings

### Verified source and historical report

- The root shell provides a skip link, one `main`, header and footer. Native links, buttons, form labels, landmarks, headings, and image alternatives are used in shared components.
- Global `:focus-visible` styling and a `prefers-reduced-motion` safety net exist. `PlayOnView` does not hide content when JavaScript is unavailable or when reduced motion is requested. Several tailored entrance animations and a preloader exist in CSS; check the cumulative experience, not just individual motion rules.
- The October 7 accessibility report documents axe-core and keyboard testing on the former asset state. It reports passing names/roles, heading hierarchy, focus visibility, menu operation, form labels/errors, zoom and text spacing; it notes no screen-reader test was available. It records a P3 axe contrast flag for decorative card ordinals, which the report treats as exempt decorative text, and a low-contrast secondary button edge that is not the sole identifier.
- Current image alternatives in service and industry data are descriptive; decorative hero and backdrop images use empty alt text. Confirm this remains correct after asset changes.
- Form labels, `aria-describedby` error links, `aria-invalid`, error alerts, and success status are present in source. Do not change those semantics during styling work.

### Limits and follow-up

The historical accessibility results do not establish accessibility of today’s changed image state or any future redesign. Re-run automated checks and keyboard inspection on the actual current build, including open mobile menu, FAQ disclosure, RFQ error/failure/success, 200%/400% zoom, text-spacing overrides, and reduced-motion emulation. Test at least one screen reader/browser pairing before launch; none is recorded in the prior QA.

## 8. Image findings

### Current assets found

| Area | Assets in `public/images` | Use established in source |
|---|---|---|
| Brand | `brand/oar-logo.png` (25,820 bytes) | CSS mask in logo/preloader |
| Homepage hero | `hero/golden harbour 2.png` (2,287,243 bytes), plus four other hero images | Current home hero points to the 2.2MB PNG |
| Services | Six JPEGs (46KB–553KB) | All six capability records reference one each; service detail and capability cards consume service images |
| Industries | Five JPEGs (42KB–147KB) | Four industry audience records reference images; one additional image exists in the directory |
| Ports | `uae-coast-satellite.jpg` (304,718 bytes) | Empty-port fallback uses this on home; it is hidden on desktop behind a background treatment and shown as a figure on narrow viewports |
| Home | `home/port-side-logistics.png` (2,508,588 bytes) | Not found referenced in the reviewed route/component searches |
| Insights/About/OG | Directories exist; no files listed in them | No images currently configured there |

Asset names, sizes, source descriptions, and the visual sample of the configured hero were inspected. No licensing manifest, source/creator, image-generation provenance, or OAR approval record was found during the scoped repository inspection. The hero visually depicts a container vessel and terminal at sunset with a distant city skyline. That appearance can imply a specific location even when copy does not name one; confirm it is appropriate for the UAE positioning and does not imply an unverified OAR port or asset relationship. This is a validation question, not a confirmed geographic claim.

### Recommendations

- Before publishing/relying on the hero and service/industry images, record provenance and approval, and ensure no recognizable third-party logo or unverified terminal branding is visible. Do not add factual alt text that identifies a port unless verified; decorative hero alt `""` is appropriate if image adds mood rather than information.
- Convert the 2.2MB hero PNG to an approved efficient JPEG/WebP/AVIF source if visual quality permits. `next/image` can emit AVIF/WebP, but source download/build/storage and cache costs remain; measure current rendered transfer size and LCP before/after.
- Confirm the unreferenced 2.5MB home PNG has an intended use or keep it out of the redesign. Avoid carrying unused high-resolution assets without a clear purpose.
- Review each service image for literal service relevance. Customs paperwork and warehouse/storage may be more directly descriptive than generic ship/port imagery; do not imply that OAR owns the depicted truck, warehouse, ship, crane, or terminal.
- Review the coastline satellite image’s caption/attribution and mobile/desktop treatments. It is a real geographic image and should not be presented as a list of ports served.

## 9. Performance risks

- **Current-image QA is missing.** Existing October 7 performance QA measured a build when no content images were published. It reports strong text-led lab measurements, but those numbers do not cover the current preloaded 2.2MB hero PNG or service/industry image requests.
- The homepage hero is preloaded and uses Next Image. Its resulting optimized transfer, decode cost, LCP, and behavior under Slow 4G need a current production-build measurement. An oversized source image is not automatically an oversized transfer, but it is a concrete optimization candidate.
- Service detail pages now load a prominent image in the opening hero. Check responsive `sizes`, actual image candidate dimensions, format, crop/CLS, and whether the image should be eagerly loaded only when it is the LCP candidate. `MediaFrame` defaults and Next Image behavior should be measured on current routes.
- `next/font/google` self-hosts Inter and Manrope at build time with `display: swap`; this remains a build/network dependency. October QA measured roughly 72KB font transfer and zero CLS before the current imagery change.
- CSS includes multiple animated card/section sequences and a branded homepage preloader. No animation library is installed. Existing QA describes no app-specific performance defect in its tested state; retest entrance timing and main-thread work with the current image payload and reduced-motion setting.
- The previous Lighthouse mobile simulated LCP was 2.7–2.8s even though the other throttling method was lower; this was recorded as P3 and should be compared with current results, not treated as current field data. No real-user Core Web Vitals are available in the repository records.

## 10. Prioritized issues

Severity separates confirmed defects from recommendations. P0/P1 denotes a critical blocker; none is confirmed by the source audit.

| Priority | Status | Finding / action |
|---|---|---|
| P0 | No finding | No source evidence of a launch-blocking visual/accessibility defect. No browser run in this audit to confirm runtime behavior. |
| P1 | Validation gate | Verify licensing/provenance and OAR approval for the configured hero, service, and industry assets. Confirm image content does not imply specific ports, owned assets, or operator status. Current repository has no provenance record. |
| P1 | Measure before finalizing | Re-run responsive and performance inspection on a production build with current images. October 7 QA’s no-images/no-image-request baseline no longer matches source. Prioritize hero LCP, service hero image, crops, and reduced-motion/preloader behavior. |
| P1 | Copy review | Have the business owner confirm titles and descriptions for Customs Clearance, Warehousing, Cargo Transportation, and Vessel Delivery continue to describe coordination/support, not licensed brokerage, owned facilities/fleet, or vessel ownership. Detail copy contains explicit scope boundaries; keep them visible. |
| P2 | Design recommendation | Refine mobile hero/service headline wrapping, CTA prominence, image focal points, and long-page section density at 320–430px without removing service-defining information. Must be verified in rendered viewports. |
| P2 | Design recommendation | Standardize image ratios, overlays, and card treatments across Services and Industries. Keep custom featured-card treatment only where it improves discoverability and text contrast. |
| P2 | Design recommendation | Review repeated supplier-to-vessel/coordination claims across home, About, Why OAR, Trust, and service pages; consolidate copy only with content-owner approval. |
| P2 | Accessibility follow-up | Re-run axe/keyboard/zoom/focus tests after the visual pass and add screen-reader testing; prior report had no screen reader available and predates current asset configuration. |
| P3 | Observation | The hero eyebrow can wrap at 320px per historical QA; retain this only if it still reads cleanly after current font/image composition is rendered. |
| P3 | Observation | The mobile-menu CTA is full panel width at 768–1023px per prior report. Existing design choice, not a measured defect. |
| P3 | Optimization candidate | Consider replacing the large hero PNG source with an approved optimized format and remove/repurpose unused large assets after confirming there are no external references. Measure rather than assume a user-visible win. |
| P3 | Observation | Prior QA flagged Lighthouse simulated mobile LCP at 2.7–2.8 seconds and a low-contrast edge on the secondary button; compare current measurements and retain only if still relevant. |

## 11. Recommended implementation sequence

1. **Asset and copy validation:** confirm image provenance, usage rights, geographic implications, and business approval. Confirm the six service labels and positioning language. Preserve the intentionally empty verified Ports/Insights collections and empty contact details until confirmed.
2. **Current-state render baseline:** run a production build with a configured non-production test origin and render current routes. Capture 320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1440, and 1920px. Record images, screenshot states, overflow, header behavior, and any changed results from the October 7 baseline. Include short landscape mobile and menu-open states.
3. **Visual system pass:** use existing CSS tokens and shared components to adjust hierarchy, section rhythm, card density, and image presentation. Avoid introducing dependencies or a parallel token system without a measured need.
4. **Homepage and shared shell:** refine header/hero/CTA, capability strip, preloader, footer, and floating contact affordance first because they affect every journey or first impression. Keep the primary CTA clear and preserve skip link/focus behavior.
5. **Overview and content pages:** tune Services, Industries, About, Why OAR, Ports, Insights, and Contact using their existing templates and accurate empty states.
6. **Service detail template:** revise the shared detail layout once, then inspect all six content variants. Keep service-specific requirements, roles, distinctions, and FAQs intact; avoid implying OAR performs regulated/owned-party work.
7. **RFQ visual styling only if included in a later approved implementation scope:** preserve existing schema, Server Action, error semantics, and delivery behavior. The Phase 1 audit itself makes no RFQ changes.
8. **Regression validation:** perform the checks listed below, then compare screenshots and current performance metrics against a documented baseline before release.

## 12. Files likely to require changes in a later implementation phase

Likely visual files:

- `src/app/globals.css` — tokens, responsive rules, transitions, image/card treatments, preloader.
- `src/components/sections/hero-section.tsx`, `src/components/sections/inner-page-hero.tsx`, `src/components/media/media-frame.tsx` — hero and media composition.
- `src/components/layout/header.tsx`, `src/components/navigation/desktop-navigation.tsx`, `src/components/navigation/mobile-navigation.tsx`, `src/components/layout/footer.tsx`, `src/components/layout/whatsapp-fab.tsx` — shared shell and responsive navigation.
- `src/components/cards/service-card.tsx`, `industry-card.tsx`, `port-card.tsx`, `insight-card.tsx`, plus `src/components/sections/capability-grid.tsx` and `industry-grid.tsx` — card systems.
- `src/components/sections/*.tsx` — page-section layout where screenshots show a concrete need.
- `src/content/home/*.ts`, `src/content/services/*.ts`, `src/content/industries/*.ts`, and page content modules — only for copy changes approved by OAR.
- `src/content/home/hero.ts`, `src/content/services/capabilities.ts`, `src/content/industries/audiences.ts` — image selection, alt text, and focal positions after asset approval.
- `public/images/**` — approved optimized replacement/crops and, if useful, a documented asset provenance note.

For this Phase 1 deliverable, only `docs/visual-responsive-audit.md` should be added. Do not edit quote form/Server Action, route architecture, SEO, or security configuration as part of a visual-only implementation without separate scope.

## 13. Regression checks required after implementation

These are required future checks, not tests run for this audit.

- Render all 15 current public routes at 320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1440, and 1920px; include narrow and landscape mobile and inspect page/body scroll width, clipping, heading wraps, crops, CTA visibility, card layout, footer, and fixed controls.
- Test navigation at 1023/1024 boundary, keyboard menu open/close, Escape focus return, link selection, body scroll lock, and viewport growth while menu is open.
- Inspect service-detail route variants for long headings, FAQ focus, role boundaries, repeated content, and responsive image crops.
- Verify `/ports` and `/insights` empty states stay intentional; unknown dynamic slugs remain 404; do not fabricate collection entries for screenshots.
- RFQ regression: labels, native semantics, all required-field errors, first-invalid focus, server failure, success, retry, keyboard-only use, short screens, and field values. Keep delivery mocked in test environments; do not send real messages.
- Accessibility: automated axe on all routes and important states; keyboard sequence and visible focus; 200%/400% zoom; text-spacing override; reduced-motion emulation; image alternative review; one screen-reader/browser pairing.
- Performance: compare production-build image transfer and formats, hero/service LCP, CLS, TBT, JS/CSS/font transfer, and real-host metrics when available. Do not report Lighthouse or field metrics as passed unless run.
- Quality gates: lint, typecheck, production build, route/status behavior, sitemap/robots and JSON-LD smoke checks after changes. These were not executed for this documentation-only phase.

## 14. Limitations and unverified items

- No browser automation or browser-control tool was available in this audit turn, so no viewport was rendered or measured here. The exact viewport results above are explicitly attributed to the October 7 QA files and their then-current tested build.
- The October 7 responsive/accessibility/performance QA reports precede the currently configured hero and service/industry image references. Their image and performance conclusions do not describe the current image state; responsive behavior of the current imagery remains unverified.
- The hero image was visually inspected as a local asset, but no full-page or responsive screenshot was rendered. Remaining image assets were inventoried by file name and size; every image was not visually reviewed.
- Image licensing, creator/provenance, approval, and whether any image depicts a particular port/operator are not documented in this audit.
- The design recommendations about hierarchy, spacing, content density, card differentiation, and crop suitability are source-informed judgments, not confirmed browser defects or user-research findings.
- No screen reader, physical mobile device, Edge, Firefox, Safari, live hosting/CDN, or real-user Core Web Vitals were tested in this turn. Prior QA docs disclose similar limits; consult them for their precise historical environments.
- No lint, typecheck, build, or automated test command was run for this documentation-only change.

## Next phase recommendation

Proceed to a focused visual implementation after asset and service-copy approval. Start with a fresh production-build screenshot/performance baseline using the configured image set, then refine the homepage/shared shell and service template with the existing tokens and components. Keep this repository’s verified-business-content rules and empty Ports/Insights states intact throughout.

