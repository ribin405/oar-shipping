# OAR Shipping GEO & AEO Content Audit

Phase 8G, 2026-10-07. Audit of the public site against the verified-only rule. One copy change was made (About page definition). No pages, FAQs, schema, keywords or business claims were added. No search-volume data is used or implied.

## 1. Entity clarity

| Concept | Where it is stated | Status |
|---|---|---|
| OAR Shipping (single brand form) | Site name, titles, JSON-LD, About | Consistent. A scan found no variants (`Oar`, `OAR Logistics`, `OAR Marine`, `OAR Ports`, `OAR Shipping UAE`). |
| Marine logistics + port execution | Homepage hero and category statement, About definition (new), service overview | Clear |
| UAE (only verified geography) | Hero, homepage statement, titles, About | Clear; no port or city named |
| Supplier → OAR → Vessel / Supplier Door → Vessel Deck | Hero flow section, service pages, contact diagram | Clear, not over-repeated |
| Role | "coordinates", "does not replace the parties", "not a port authority" | Clear; no carrier, forwarder, broker, warehouse-owner or agent claim |

`oarports.com` is not referenced as an entity anywhere in the site.

## 2. Search intent by page

| Page | Intent | Purpose |
|---|---|---|
| `/` | Commercial, brand | Category and company, entry to services |
| `/services` | Commercial | Service discovery |
| `/services/*` (6) | Commercial | One specific service each, ending in Request a Quote |
| `/industries` | Evaluation (audience) | Who OAR supports, route into services |
| `/about`, `/why-oar` | Evaluation / brand | Company role, operating principles |
| `/ports` | Geographic (unfulfilled) | Explanatory only; verified ports listed once confirmed |
| `/insights` | Informational (unfulfilled) | Editorial index, empty by design |
| `/contact` | Navigational | No channels shown because none are verified |
| `/request-a-quote` | Transactional | Conversion endpoint |

## 3. AEO question coverage

| Question | Page | Answer quality | Action |
|---|---|---|---|
| What is OAR Shipping? | Home, About | Strong (About now defines it answer-first) | Done |
| What does OAR do? | Home, Services | Strong | None |
| What is marine logistics / port execution (as OAR uses the terms)? | About | Was missing; now a one-paragraph definition | Done |
| What is port logistics? | `/services/port-logistics` lead | Strong | None |
| What does vessel delivery mean? | `/services/vessel-delivery` lead (cargo and supplies to a vessel, not delivering a vessel) | Strong | None |
| What does customs clearance coordination mean? | `/services/customs-clearance` | Strong; no broker claim | None |
| What does warehousing coordination cover? | `/services/warehousing` | Strong; no ownership claim | None |
| What is cargo transportation here? | `/services/cargo-transportation` (shore-side, not ocean freight) | Strong | None |
| What does port coordination involve? | `/services/port-coordination` | Strong; not a port authority | None |
| What is the difference between port logistics and port coordination? | The two service pages, distinct leads | Adequate, implicit | Future article |
| Who does OAR serve? | `/industries` | Strong (five approved audiences) | None |
| What information is needed for a quote? | RFQ page aside, service "requirements" lists, Contact guidance | Strong | None |
| Where does OAR operate? | Home, About, Ports ("UAE") | Adequate: market only | Blocked on ports verification |
| Which ports does OAR serve? | `/ports` | Unverified | Do not claim |
| Is OAR a customs broker? | Customs page | Unverified | Do not claim |
| Does OAR own or operate warehouses? | Warehousing page | Unverified | Do not claim |
| Is OAR available 24/7? What are response times, prices, certifications? | none | Unverified | Do not claim |

## 4. GEO readiness

An AI system can derive from the site alone: what OAR Shipping is (marine logistics and port-execution coordinator, UAE); what it does (coordinates shore-side movement between supplier, port and vessel); the six services and their meaning; the five audiences; the role boundary (coordinates, does not replace the parties, not a port authority); the primary action (Request a Quote). It cannot infer, and the site does not claim, specific ports, licences, assets, history, contact channels or performance. Structured data (Organization, WebSite, Service, BreadcrumbList) matches visible content and omits all unverified properties.

## 5. Content quality findings

- Generic filler (`in today's…`, `trusted partner`, `world-class`, `seamless`, `industry-leading`, `best-in-class`, `committed to excellence`, `unparalleled`): none found.
- Superlatives and unsupported claims (`best`, `leading`, `largest`, `fastest`, `guaranteed`, `certified`, `audited`, `licensed`, `24/7`, `fleet`, `bonded`): none in public copy. Legitimate non-claim hits: "does not act as a port authority" (Port Coordination) and "leading to the vessel" (a verb, Port Logistics FAQ).
- Previously invented Stitch claims (Live Port Readiness, 100% Berthing, Zero Demurrage, audited chain of custody, DP World, AD Ports, bonded quay fleet, telemetry, OAR-DXB-9842, MSC Ravenna, Jebel Ali Berth 14, security clearance, port IDs, terminal-compliant trucks, All UAE Ports Covered, 15 minutes, +971 number, ops@ address): none present in source or in the built HTML.
- Keyword stuffing: none. Core terms appear naturally and with distinct meanings per service page.
- Clarity: the only gap was the missing plain definition of "marine logistics" and "port execution" as OAR uses them; fixed on `/about`.

## 6. Cannibalization

Resolved in Phases 8C and 8E and re-checked: Homepage owns category and brand; Services owns discovery; Port Logistics (cargo movement through the port side) and Port Coordination (timing, documents, communication) have different leads; Vessel Delivery (final handover to the vessel) and Cargo Transportation (shore-side legs, not ocean freight) are distinct; the RFQ page holds no service definitions. Deferred risk: future Insights articles must take explainer queries and link to the service page, not duplicate it.

## 7. Keyword coverage report (no forcing)

Covered naturally: marine logistics and port execution in the UAE (home, About, titles); port logistics (service page, title); cargo delivery to vessel (service page, title); marine customs clearance coordination; cargo warehousing and staging coordination; port cargo transportation; port call coordination; the brand name. Gaps by design: any port or city modifier (unverified), generic head terms (not targeted), "marine logistics company" as a claim of scale.

## 8. Alt text and images

The site currently publishes no content images. The logo is a CSS mask inside a link labelled "OAR Shipping home", so there is no image alt to set. For future approved imagery: alt text describes the actual image in context (for example "Cargo being staged before delivery to a vessel", only if true); decorative images use `alt=""`; filenames describe the content (for example `cargo-staging-port.jpg`, never `marine-logistics-uae-best-port-services.jpg`).

## 9. Future article roadmap (not published; each needs OAR sign-off for accuracy)

| # | Title | Intent | Audience | Related service | Why useful | Verification needed |
|---|---|---|---|---|---|---|
| 1 | Port logistics explained | Informational | Ship managers, suppliers | Port Logistics | Defines the category in OAR's terms | Light: OAR review |
| 2 | The supplier-to-vessel cargo journey | Informational | Chandlers, ship managers | Vessel Delivery | Explains the core differentiator | OAR review |
| 3 | How delivery to a vessel is coordinated | Informational | Chandlers, agents | Vessel Delivery | Answers "how does cargo reach a vessel" | OAR review of the steps |
| 4 | What port coordination involves | Informational | Agents, ship managers | Port Coordination | Separates it from port logistics | OAR review; agent status |
| 5 | Marine customs coordination: what to prepare | Informational | Suppliers, forwarders | Customs Clearance | Documents and timing | Yes: customs role and accuracy |
| 6 | What cargo staging means before vessel delivery | Informational | Suppliers | Warehousing | Explains holding and preparation | Yes: OAR facilities and role |
| 7 | Shore-side cargo transportation, explained | Informational | Forwarders, suppliers | Cargo Transportation | Clears the ocean-freight confusion | Light |
| 8 | What to include in a vessel delivery request | Informational / transactional | All | RFQ and services | Raises RFQ quality | Light |
| 9 | Port-side documentation: an overview | Informational | Agents, suppliers | Customs, Port Coordination | Supports planning | Yes: accuracy |
| 10 | Planning marine logistics around a port call | Informational | Ship managers | Port Logistics | Timing and sequencing | OAR review |

## 10. Future AEO question inventory (no FAQ pages created; use as article sections or visible FAQs only once approved)

- General: What is marine logistics? What is port execution? Who uses marine logistics coordination? How does OAR coordinate cargo between supplier and vessel?
- Port Logistics: What happens in a port-side cargo journey? What does port logistics coordinate?
- Vessel Delivery: What does vessel delivery mean? What happens between supplier pickup and the vessel? What information is needed for a vessel delivery request?
- Customs: How does customs coordination fit into a delivery to a vessel? Which documents travel with vessel cargo? (OAR verification)
- Warehousing: Why might cargo be staged before delivery? (OAR verification)
- Transportation: What is shore-side cargo transportation, and how does it differ from ocean freight?
- Port Coordination: What does port coordination involve? How is it different from port logistics?
- RFQ: What information should I provide to request a quote?

FAQPage schema stays out until genuinely approved, visible FAQ content exists.

## 11. Business verification blockers

Legal business name; official domain and canonical hostname; phone; email; WhatsApp; physical address; office hours; social profiles; ports served; cities served; customs capabilities and licensing; warehouse ownership and capabilities; agent status; certifications; memberships; leadership; company history; operational statistics; approved photography; previous website URL inventory; the `oarports.com` relationship.

## 12. Recommendations

- Required before launch: production domain and hostname, `NEXT_PUBLIC_SITE_URL`, RFQ environment variables and a live test, hosting-level HTTPS and host redirects.
- Recommended after launch: monitor Search Console queries to learn the wording customers actually use; add port-specific content only for ports OAR confirms.
- Future content: the roadmap above, in priority order.
- Requires business verification: everything in section 11.
