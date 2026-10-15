# OAR Shipping Image Art Direction Audit

Audit date: 2026-10-13  
Scope: image inventory, current references, and image direction for the homepage hero and six services. No image, source code, route, or image presentation was changed in this audit. The available files do not provide verified provenance or a clearly approved replacement for the service images that need improvement.

## Current implementation

- The homepage hero uses `public/images/hero/oar-hero.webp` (1672 × 941, WebP, 227,780 bytes). It is a wide container-ship-at-terminal scene with the ship and cranes on the right and open dark sky/water on the left. The composition is cinematic and leaves text space, but it reads as a harbor/terminal scene rather than a vessel at sea. The skyline may suggest a particular city; no location is stated in the image alt text or adjacent hero copy beyond the existing UAE service statement.
- The hero is rendered by `HeroSection` through `MediaFrame` and `next/image`, uses `sizes="100vw"`, is preloaded as the single above-the-fold image, and has a decorative empty alt. Its source crop is center-right on narrow screens and right-aligned from `lg` upward. The overlay is already part of the shared image component.
- The six service images are sourced from `src/content/services/capabilities.ts`. They are rendered through `MediaFrame` and `next/image` by the homepage service mosaic and service pages. Aspect-ratio wrappers reserve layout space; these images are not preloaded.
- Image rights, creator, source URLs, and OAR approval are not documented in the repository. Visual inspection alone cannot establish licensing or whether an image is AI-generated. None of these assets should be described as depicting OAR's actual operations.

## Image inventory

| File | Dimensions / format | Size | Current reference / assessment |
|---|---:|---:|---|
| `brand/oar-logo.png` | 640 × 248 PNG | 25.8 KB | Referenced by the shared logo and structured data. |
| `hero/oar-hero.webp` | 1672 × 941 WebP | 227.8 KB | Homepage hero. Strong wide composition; terminal setting rather than open sea. |
| `hero/Golden Harbor Sunset with Container Ship.png` | 1672 × 941 PNG | 2.26 MB | Unreferenced. Similar harbor-at-sunset composition; materially larger source and no documented provenance. |
| `hero/golden harbour 2.png` | 1672 × 941 PNG | 2.29 MB | Unreferenced. Similar composition to the active hero; no reason to restore the much larger PNG source. |
| `hero/port 1.jpg` | 1024 × 1024 JPEG | 204.1 KB | Unreferenced square harbor scene with multiple vessels and a city skyline; less useful as a wide hero, and location/provenance is unknown. |
| `hero/ship 1.jpg` | 736 × 488 JPEG | 38.5 KB | Unreferenced hazy container ship at a terminal; wide but comparatively small and soft for a full-width hero. |
| `hero/ship 2.jpg` | 1024 × 1173 JPEG | 97.3 KB | Unreferenced stylized ship/world-map illustration; not documentary photography and not appropriate for the requested photo direction. |
| `home/port-side-logistics.png` | 1672 × 941 PNG | 2.51 MB | Referenced only by `PortLogisticsImage`, which has no current source import/use. Depicts workers and cargo beside a vessel; visual details appear synthetic on inspection, so do not present as documentary evidence. No provenance is recorded. |
| `services/port-logistics.jpg` | 1600 × 2000 JPEG | 437.5 KB | Used for Port Logistics. Dramatic silhouetted cranes at sunset, but not a clear commercial cargo-handling scene; only a supporting contextual image. |
| `services/vessel-delivery.jpg` | 1600 × 2400 JPEG | 164.9 KB | Used for Vessel Delivery. A suspended crane hook against sky; does not show cargo or marine-supply delivery. Needs a verified replacement. |
| `services/customs-clearance.jpg` | 1600 × 1200 JPEG | 179.2 KB | Used for Customs Clearance. A hand writing on an invoice; documentation-adjacent but generic and staged, with no cargo or container context. Needs a stronger verified replacement. |
| `services/warehousing.jpg` | 1600 × 2400 JPEG | 565.7 KB | Used for Warehousing. Realistic-looking pallet storage on industrial racks; best service match in the current set. Keep generic and do not imply OAR owns the pictured facility. |
| `services/cargo-transportation.jpg` | 1600 × 1067 JPEG | 155.0 KB | Used for Cargo Transportation. A truck on an open mountain road; shows freight transport but not shore-side or port-connected transport. Replace when a verified port-side cargo transport image is available. |
| `services/port-coordination.jpg` | 1600 × 1199 JPEG | 476.7 KB | Used for Port Coordination. Overhead container-terminal road scene; relevant context but no visible coordination activity. Acceptable as context, not literal evidence of OAR coordination. |
| `industries/freight-forwarders.jpg` | 800 × 450 JPEG | 146.7 KB | Used by Industries for freight-forwarder audience; container-terminal aerial. |
| `industries/marine-offshore.jpg` | 800 × 450 JPEG | 47.9 KB | Used by Industries for offshore audience; offshore platform silhouette at sunset. |
| `industries/marine-suppliers.jpg` | 800 × 450 JPEG | 47.2 KB | Used by Industries for supplier audience; container-ship hull at sunset. |
| `industries/ship-management.jpg` | 800 × 450 JPEG | 42.8 KB | Used by Industries for ship-management audience; bridge interior. |
| `industries/shipping-agents.jpg` | 800 × 450 JPEG | 79.7 KB | Used by Industries for shipping-agent audience; harbor tug by quay. |
| `ports/uae-coast-satellite.jpg` | 1600 × 1065 JPEG | 304.7 KB | Used in the Ports section; geographic image, not evidence of published port coverage. Preserve the existing empty collection behavior. |

Sizes are source file sizes, not measured browser transfer sizes after Next.js image optimization.

## Art direction and integration requirements

No image source was replaced: the repository contains no clearly documented, approved image that resolves the service gaps, and network sourcing is outside this task's constraints. Keep the current sources provisionally while approval and rights are checked.

Request or select assets with documented commercial rights and creator/source records:

- **Homepage hero:** wide, high-resolution (about 2400 × 1350 or larger) documentary vessel-at-sea or ship-underway image; natural atmospheric light, deep marine tones, vessel positioned to leave the existing left text area readable. Avoid identifiable ports/landmarks unless confirmed and intended. Integrate through `src/content/home/hero.ts`; keep decorative alt if the adjacent text carries the same message.
- **Port Logistics:** landscape commercial port cargo-handling image with cranes, quay, and cargo activity, framed to remain legible as the featured card backdrop. Integrate through `serviceCapabilities` in `src/content/services/capabilities.ts` and retain the existing featured card presentation.
- **Vessel Delivery:** cargo or marine-supply transfer at the shore-to-vessel interface; avoid implying OAR owns the vessel or performs work outside its stated coordinating role.
- **Customs Clearance:** cargo/container inspection or a credible documentation-and-cargo context; avoid legible personal/contact data and invented customs credentials.
- **Warehousing:** current image is service-relevant; replace only if provenance/rights cannot be confirmed or a better approved image is supplied.
- **Cargo Transportation:** commercial shore-side cargo transport near a port or logistics facility, without implying OAR owns the truck or facility.
- **Port Coordination:** wide contextual port scene with several activities or transport links visible; do not imply a specific port or claim that the image documents OAR's operation.

Use the current `MediaFrame` integration, descriptive alt text for informative images, empty alt only for decorative imagery, and responsive `sizes` matched to the card layout. Keep the hero as the only preloaded image. Preserve parent aspect ratios to avoid layout shift. No added animation is needed for image direction.

## Validation limitations

No browser automation package or browser executable is available in this workspace, so image crops and loading were not rendered at 375, 430, 1024, or 1440 CSS pixels. Manual browser QA at those sizes remains required. Licensing, creator, asset origin, and possible AI generation also remain unverified.
