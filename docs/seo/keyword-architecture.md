# OAR Shipping SEO Keyword Architecture

Status: Phase 8B blueprint. Source of truth for Phase 8C. No site content, routes or schema were changed to produce it.
Prepared: 2026-10-06.

**Metrics policy.** No keyword tool or volume data was available. This document contains no search volumes, difficulty, CPC, trend or ranking estimates; every such field is "Not available". Qualitative SERP observations come from live web searches run on 2026-10-06 (US-based search, so UAE results may differ) and are used only to understand intent and result types. Competitor claims are not evidence about OAR.

**Business-fact policy.** Anything about OAR's coverage, capabilities, assets or credentials that is not in the approved site content or supplied by OAR is marked Unverified or Unknown and is not a basis for targeting.

---

## 1. SEO Positioning

- **Brand:** OAR Shipping (the site's established form; "Oar Shipping" in briefs is the same name, search is case-insensitive).
- **Category to own:** marine logistics and port execution, UAE. Core idea: OAR coordinates the shore-side journey from supplier to vessel ("Supplier Door → Vessel Deck").
- **Audiences:** primary: ship management companies, ship chandlers / marine suppliers, shipping agents. Secondary: freight forwarders / logistics companies, marine and offshore.
- **Honest competitive position:** OAR coordinates; the site does not claim vessels, warehouses, terminals, a customs-broker licence or agency status. The head terms ("marine logistics company UAE", "port logistics UAE") are held by established asset-owning firms, port operators and directories. OAR's realistic search value is (a) brand and entity queries, (b) narrow "coordination between supplier and vessel" queries, and (c) a conversion path for visitors who arrive from other channels. Phase 8C should aim for relevance and clarity, not for head-term rankings.
- **Brand language and search language coexist.** OAR says "port execution" and "coordination"; searchers say "port logistics", "marine logistics", "port operations", "delivery to vessel". Use search language in titles, H2s and descriptions, and keep OAR language in headlines and body. Do not rename anything.

## 2. Search Intent Model

| Intent | What the searcher wants | Where it lives |
|---|---|---|
| Navigational / brand | Find OAR Shipping | Homepage; About |
| Commercial / service | A provider for a specific service | Service pages; homepage for the broad category |
| Transactional / lead | Ask for a quote now | `/request-a-quote` (reached from every service page; not a keyword target) |
| Local / geographic | A provider at a named port or city | Not available until OAR verifies coverage (section 6) |
| Informational | Understand a process or term | Future Insights articles (section 9) |
| Audience / problem | "Logistics for ship chandlers", "for ship managers" | `/industries`, possibly one future page (section 11) |

Transactional variants ("port logistics quote UAE") are not given pages. The service page captures the commercial query; the RFQ page is the destination.

## 3. Existing Page Inventory

Verified against `src/app` and the content collections. Volume and difficulty: Not available for every row.

| URL | Purpose | Audience | Intent | Current title | Current H1 | Current meta description | Commercial value |
|---|---|---|---|---|---|---|---|
| `/` | Category and entity page | All | Navigational, broad commercial | OAR Shipping \| Marine Logistics & Port Execution in the UAE | Creators of Calm Port Calls | OAR Shipping is an international B2B marine logistics and port-execution company operating in the UAE. | High |
| `/about` | Company role and approach | Evaluators | Brand, trust | About OAR \| Marine Logistics & Port Execution | Connecting the shore-side operation to the vessel. | OAR focuses on marine logistics and port execution, coordinating suppliers, cargo and vessel requirements across the UAE maritime environment. | Medium |
| `/why-oar` | Differentiation | Evaluators | Commercial evaluation | Why OAR \| UAE Marine Logistics & Port Execution | The operational bridge between supplier and vessel. | Why OAR coordinates the shore-side activities between supplier and vessel: one operating model for cargo, documentation, transport and port-side execution in the UAE. | Medium |
| `/services` | Service hub | All | Commercial | Services \| OAR Shipping | Port-side logistics built around the vessel requirement. | OAR's six service areas: port logistics, vessel delivery, customs clearance, warehousing, cargo transportation and port coordination, connected around the vessel requirement. | High |
| `/services/port-logistics` | Service | Primary audiences | Commercial | Port Logistics \| OAR Shipping | Coordinating the port-side movement around your vessel requirement. | Port logistics coordinated around the vessel requirement: supplier, cargo, documentation, transport and port-side activity connected on the way to the vessel. | High |
| `/services/vessel-delivery` | Service | Chandlers, managers | Commercial | Vessel Delivery \| OAR Shipping | Moving marine cargo from supplier to vessel, with coordination around the journey. | Vessel delivery coordination from supplier to vessel: cargo preparation, transport and port-side activity aligned around the vessel's requirement. | High |
| `/services/customs-clearance` | Service | Suppliers, forwarders | Commercial | Customs Clearance \| OAR Shipping | Coordinating customs-related requirements as part of the marine logistics journey. | Customs-related coordination as part of the marine logistics journey: clearance support and documentation coordination alongside cargo movement. | Medium |
| `/services/warehousing` | Service | Suppliers | Commercial | Warehousing \| OAR Shipping | Warehousing coordination for cargo received, stored or prepared before onward movement. | Warehousing coordination for cargo that needs to be received, stored or prepared before onward movement toward the port and the vessel. | Low–Medium |
| `/services/cargo-transportation` | Service | Suppliers, forwarders | Commercial | Cargo Transportation \| OAR Shipping | Coordinating cargo transportation between supplier, logistics points and the port requirement. | Cargo transportation coordinated between supplier, logistics points and the port requirement, planned around the vessel's timing. | Medium |
| `/services/port-coordination` | Service | Managers, agents | Commercial | Port Coordination \| OAR Shipping | Keeping the moving parts of a port requirement connected around the vessel. | Port coordination that keeps timing, documentation, transport and communication connected between the parties around a vessel requirement. | Medium |
| `/industries` | Audience overview | All five | Audience / problem | Industries \| OAR Shipping | Built around the needs of maritime operations. | OAR's port execution model is designed for ship managers, marine suppliers, shipping agents, freight forwarders and marine and offshore operators working through the UAE port environment. | Medium |
| `/ports` | Explanatory index; no port entries | All | Local (unfulfilled) | Ports & Locations \| OAR Shipping | Port-side coordination across the UAE. | OAR coordinates suppliers, cargo, documentation, transport and vessel requirements within the UAE maritime environment. Port-side coordination around the vessel requirement. | Low until verified |
| `/insights` | Editorial index; no articles | All | Informational (unfulfilled) | Insights \| OAR Shipping | Operational knowledge for better port calls. | Perspectives on marine logistics, port execution and the coordination required to move cargo from supplier to vessel. | Low until content exists |
| `/contact` | Contact and intake guidance | All | Navigational, conversion | Contact OAR Shipping \| Marine Logistics & Port Execution | Let's discuss your port-side requirement. | Discuss a marine logistics, port-execution or vessel-support requirement with OAR. Share the cargo, location, port and timing so the requirement can be assessed. | High (conversion) |
| `/request-a-quote` | RFQ form | All | Transactional | Request a Quote \| OAR Shipping | Tell us what needs to move, where and when. | Share your cargo, vessel and delivery requirement with OAR: service, cargo, pickup location, delivery port, vessel and timing. | Highest (conversion) |

Dynamic routes `/ports/[slug]` and `/insights/[slug]` exist but have no entries; they return 404 and are not in the sitemap.

## 4. Core Keyword Clusters

Fit ratings answer: can the existing page satisfy what the searcher actually wants? (SERP intent test, section 28 of the brief.)

### Tier 1: core commercial

| Cluster | Terms evaluated | What the SERP shows (2026-10-06) | Fit |
|---|---|---|---|
| Brand | OAR Shipping; OAR Shipping UAE; OAR marine logistics | Brand queries are uncontested by design, but "OAR" collides with other entities: the search "marine customs clearance UAE vessel" surfaced a result titled "OAR Technologies – Marine Logistics & Customs Clearance UAE" on `oarports.com`. Whether that is OAR's legacy site or an unrelated business is unconfirmed (page content could not be read). | Strong fit; entity disambiguation needs OAR input |
| Marine logistics | marine logistics UAE; marine logistics company/services/provider UAE | Directories and listicles, plus homepages and service pages of established firms (GAC, P&O Maritime Logistics, ADSO, Great Marine Logistics). Searchers want a provider list or an established operator. | Partial fit; homepage can credibly rank for category and brand-adjacent terms only if it clearly says what OAR is. Do not use "company" as a claim of scale |
| Port logistics | port logistics UAE; port logistics services UAE; UAE port logistics; port execution UAE | Port operators and terminal groups (Gulftainer, DP World), shipping lines (MSC), port-information articles, freight and agency firms. Mixed meaning: port infrastructure vs. service providers. "Port execution" is almost unused by searchers. | Partial fit for "port logistics"; poor fit for "port execution" as a standalone target (keep as brand/secondary language) |
| Delivery to vessel | cargo delivery to vessel; vessel supply logistics; ship supply logistics; vessel delivery UAE | Dominated by ship chandlers (Shipstar, Zak, AVS) selling the supplies themselves. "Vessel delivery" and "ship delivery" are also ambiguous: they commonly mean delivering a boat or newbuild. | Partial fit for "cargo delivery to vessel"; poor fit for "ship delivery UAE" and "ship supply" as head terms, because those searchers want a chandler. OAR's customer is the chandler, so phrase as logistics for chandlers/suppliers |

### Tier 2: supporting commercial

| Cluster | Terms evaluated | Observations | Fit |
|---|---|---|---|
| Customs | marine customs clearance UAE; vessel customs clearance; ship cargo customs clearance; customs clearance UAE | Results mix general customs guides, brokers/agents, and yacht-clearance services. Generic "customs clearance UAE" is broad and dominated by licensed brokers. OAR describes "customs-related coordination", not brokerage. | Partial fit as a secondary term on the Customs page; do not target the generic head term. Licence status needs verification |
| Warehousing | marine warehousing UAE; port warehousing UAE; marine cargo warehousing | Operators of owned warehouses. OAR content says "warehousing coordination"; ownership is unverified. | Needs verification; use only coordination wording |
| Cargo transportation | port cargo transport UAE; cargo transportation to port; marine cargo transportation UAE | "Marine cargo transportation" usually means sea carriage (coastal shipping, e.g. ADSO). OAR coordinates shore-side legs. | Poor fit for "marine cargo transportation"; partial for "port cargo transport / cargo transport to port" |
| Port coordination | port coordination UAE; port call coordination UAE; vessel port coordination | Results are explainers and software vendors; in practice port call coordination is the vessel agent's role. Low evidence that people search "port coordination" to buy a service. | Partial fit; better as a service-page secondary term and as an informational Insights topic. Avoid wording that implies shipping-agency status |
| Transactional variants | port logistics quote UAE; request marine logistics quote UAE | Quote-intent pages of providers. | Handled by `/request-a-quote` and service-page CTAs; no dedicated pages |

### Tier 3: informational (future Insights, not published)

See section 9.

## 5. Keyword-to-Page Map

Primary topic per page (the one search intent it owns), with secondaries. Volumes: Not available.

| Page | Primary topic / keyword | Secondary keywords and themes | Intent |
|---|---|---|---|
| `/` | marine logistics and port execution, UAE | OAR Shipping (brand); supplier-to-vessel logistics; port logistics coordination; marine cargo delivery to vessels | Navigational + broad commercial |
| `/services` | port and vessel logistics services (UAE) | the six service names; supplier-to-vessel services | Commercial hub |
| `/services/port-logistics` | port logistics (UAE) | port-side logistics coordination; port logistics services | Commercial |
| `/services/vessel-delivery` | cargo delivery to vessel (UAE) | vessel delivery coordination; vessel supply logistics; delivery to vessels at port | Commercial |
| `/services/customs-clearance` | marine customs clearance coordination (UAE) | vessel cargo customs documentation; customs clearance support | Commercial |
| `/services/warehousing` | marine cargo warehousing coordination | storage before vessel delivery; cargo staging | Commercial (verification-gated) |
| `/services/cargo-transportation` | port cargo transport coordination (UAE) | cargo transport to port; supplier-to-port transport | Commercial |
| `/services/port-coordination` | port call coordination support (UAE) | vessel port coordination; port operations coordination | Commercial |
| `/industries` | logistics for ship managers, chandlers/marine suppliers, shipping agents, forwarders, offshore | audience and problem language | Audience / problem |
| `/why-oar` | none (evaluation page) | operating model, supplier-to-vessel continuity; no head keyword | Commercial evaluation |
| `/about` | none beyond brand | OAR Shipping; marine logistics and port execution UAE as context only | Brand / trust |
| `/ports` | none until verified | UAE ports (context only) | Local (unfulfilled) |
| `/insights` | none until content exists | topic labels already on page | Informational (unfulfilled) |
| `/contact` | brand contact | contact OAR Shipping | Navigational |
| `/request-a-quote` | request a quote (generic) | marine logistics quote only as natural wording | Transactional |

**Homepage role.** Establish the category and the entity: who OAR is, for whom, in which market. Primary theme: "marine logistics and port execution in the UAE" (validated: "marine logistics UAE" matches how searchers describe the category; "port execution" is brand language and is kept alongside it). Secondary themes: supplier-to-vessel logistics, port logistics, delivery to vessel, the six services as a pointer, the three primary audiences. The homepage does not try to rank for individual service terms.

**About, Why OAR, Contact, Request a Quote.** About: brand, trust and entity, no service keyword blocks. Why OAR: differentiation page, no separate keyword. Contact: navigational and conversion, no generic SEO text. Request a Quote: transactional; it answers "how do I request this", not "what is this service", so it never duplicates a service page's target.

## 6. Geographic Opportunities

The site and the strategy report name no verified OAR location. The report lists "Fujairah marine logistics", "Fujairah port logistics" and "Khorfakkan port logistics" only as strategic keyword themes to validate, and lists "confirmed UAE ports currently supported" as information still required from OAR. The competitor set in that report is Fujairah-heavy, which indicates search demand relevance, not OAR coverage.

| Location | Search relevance | OAR operational evidence | Safe to target? | Notes |
|---|---|---|---|---|
| UAE (country) | High; already used site-wide | Verified as the market in approved positioning | Yes | Use as the market modifier |
| Dubai | High (general logistics searches are Dubai-heavy) | Unknown | No | Emirate-level claim; needs confirmed coverage |
| Jebel Ali | High for port/cargo queries | Unknown | No | Port-specific; needs confirmation and port access basis |
| Port Rashid | Medium; cruise and vessel-service associations | Unknown | No | |
| Abu Dhabi | Medium | Unknown | No | |
| Khalifa Port | Medium | Unknown | No | |
| Fujairah | High for marine services (bunkering, agency, ship supply) | Unknown | No | Strongest demand-side relevance; the strategy report names it as a theme only |
| Khorfakkan | Medium | Unknown | No | |
| Hamriyah | Low–Medium | Unknown | No | |

Result: **Verified:** UAE only. **Unverified/Unknown:** every named port and city. **Potential:** Fujairah, Jebel Ali, Dubai, Khorfakkan, once OAR confirms coverage. **Not recommended:** any location-modified page or title now.

**Port pages decision.** Keep port detail pages unpublished. OAR has supplied no verified port, service availability, port access, operating information or port-specific content; a page without that would be the "Port X is important, contact OAR" doorway the brief rules out. Re-evaluate per port only when OAR provides verified coverage plus unique operational content.

**No doorway pages.** Do not create location-keyword variants of services. Once coverage is verified, add a verified list of locations to `/ports` and mention them on the relevant service pages, with internal links, rather than cloning pages per city.

## 7. Cannibalization Risks

| Overlap | Risk | How Phase 8C avoids it |
|---|---|---|
| `/` vs `/services` (both about "marine logistics services") | Medium | Homepage owns the category and brand ("marine logistics and port execution UAE"); `/services` owns the list of services and the "services" query, with no category definition block |
| `/services/port-logistics` vs `/services/port-coordination` | High | Port logistics = movement of cargo through the port side; port coordination = timing, documentation and communication between parties. Distinct H2s and distinct primaries; link them to each other, never reuse each other's primary phrase |
| `/services/port-logistics` vs `/services/vessel-delivery` | Medium | Port logistics is the whole port-side movement; vessel delivery is the final leg "delivery to vessel". Keep "to vessel" language on the latter |
| `/services/cargo-transportation` vs `/services/vessel-delivery` | Medium | Transportation = supplier/logistics points to port; delivery = port to vessel handover |
| `/services/customs-clearance` vs generic "customs clearance UAE" | Low | Not targeted as a head term; secondary only |
| `/services/*` vs `/request-a-quote` | Medium | RFQ title/description stay generic ("request a quote"); service names appear only as form options; no service keyword copy on RFQ |
| `/industries` vs service pages | Low | Industries uses audience language; services use service language |
| `/ports` vs homepage ("UAE ports") | Low | `/ports` stays explanatory; no "UAE port logistics" target on it |
| `/why-oar` and `/about` vs `/` (all mention "marine logistics & port execution") | Medium | Keep the phrase in titles for consistency, but leave keyword targeting to the homepage; body copy of About and Why OAR stays brand/trust-focused |
| `/insights` articles vs service pages (future) | High if unplanned | Articles take "what is / how does" queries and link to the service page; service pages never answer the explainer query |

## 8. Content Gaps

| Gap | Classification |
|---|---|
| Homepage never states the plain search-language category ("marine logistics" + "UAE" + who it is for) in the hero/lead area beyond the title and hero description | Fix existing page |
| Service pages describe coordination in OAR language but lack the plain "what is X for vessels in the UAE" definition searchers use | Fix existing page |
| "Vessel delivery" ambiguity (delivering a boat vs cargo to a vessel) is not disambiguated | Fix existing page |
| "Cargo transportation" may be read as sea freight; page does not clarify shore-side scope | Fix existing page |
| Titles of the six service pages and Industries/Services are bare names ("Port Logistics \| OAR Shipping") with no descriptor that adds search meaning | Fix existing page |
| Process explainers: how port logistics, vessel delivery and port call coordination work | Future Insights article |
| Customs documents for vessel cargo | Future Insights article (needs OAR sign-off on accuracy) |
| Location queries (Fujairah, Jebel Ali, Dubai, Khorfakkan) | Business verification required |
| Audience page for ship chandlers (see section 11) | Business verification required |
| Brand/entity disambiguation vs other "OAR" results | Business verification required |
| Generic head terms ("shipping company", "freight company", "ship supply UAE") | Not worth targeting |

## 9. Future Content Opportunities (Insights, Tier 3)

Do not publish until OAR approves topics and facts. Intent and priority are qualitative.

| Topic | Search intent | Business relevance | Related service | Priority |
|---|---|---|---|---|
| Port logistics explained | "what is port logistics" (informational; SERP is explainers) | High: defines OAR's category | Port Logistics | 1 |
| How delivery to a vessel works (supplier → port → vessel) | "how vessel delivery works", "ship supply logistics process" | High: core differentiator | Vessel Delivery | 1 |
| What a port call involves and who coordinates it | "port call coordination" (SERP: explainers and software vendors) | High, but overlaps vessel-agent territory; keep factual | Port Coordination | 2 |
| Marine cargo customs documents for vessel supply | "marine cargo customs clearance" | Medium; accuracy sensitive | Customs Clearance | 2 |
| Staging cargo before vessel delivery (warehousing role) | "marine cargo warehousing" | Medium | Warehousing | 3 |
| Moving cargo from supplier to port | "port cargo transport" | Medium | Cargo Transportation | 3 |
| UAE port operations overview | "UAE port operations" | Medium; needs verified, sourced facts, not generic port trivia | Port Logistics | 3 |

## 10. Verification Requirements

SEO claims requiring OAR verification before they may appear in copy, titles, schema or location pages:

- Ports and cities served; port access; terminal relationships
- Customs capabilities: broker licence, who files declarations, which clearance types
- Warehouse availability, ownership, size, bonded status
- Fleet or other assets (trucks, vessels)
- Certifications, memberships, regulatory approvals
- Operating hours; 24/7 or emergency service
- Years of experience, founding date, leadership
- Response times, delivery times, delivery guarantees
- Whether OAR acts as a shipping or port agent (affects "port coordination" wording)
- Legal entity name and whether it is formally "OAR Shipping" in all registrations
- Whether `oarports.com` ("OAR Technologies" in search results) is OAR's legacy domain, an affiliate, or an unrelated business; also the full legacy URL inventory for redirects
- Contact details (phone, email, address), needed for Local SEO and schema later

## 11. Pages Not Recommended

| Candidate | Recommendation |
|---|---|
| `/ports/[port]` pages (Fujairah, Jebel Ali, Dubai, Khorfakkan, etc.) | **Keep unpublished**; requires OAR verification plus unique content |
| Location variants of services (`/fujairah-marine-logistics`, `/dubai-...`) | **Not recommended**: doorway pattern |
| Separate pages for "marine customs clearance", "ship supply", "ship delivery", "marine cargo transportation" | **Not recommended**: duplicates of existing service pages, or terms that attract the wrong audience |
| Quote-variant pages ("port logistics quote UAE") | **Not recommended**: RFQ page serves this |
| Per-audience pages for ship management, shipping agents, forwarders, offshore | **No new page required**: keep consolidated on `/industries`; they share one operational problem and have no distinct, evidenced search intent |
| Ship chandlers / marine suppliers page ("logistics for ship chandlers UAE") | **Potential future page / requires OAR verification**: a distinct audience, the most differentiated problem (getting supplies to vessels), and OAR's main customer type. Create only if OAR provides concrete content (workflow, requirements, document handling). Not before |
| Insights articles | **Potential future page** per section 9, after approval |

## 12. Phase 8C Implementation Priorities

Recommended order (the brief's default order holds; no research finding justified a change except the notes):

1. Homepage: category and entity wording, title/description with plain "marine logistics" + UAE.
2. Services overview: owns "services" and the six names; avoid category definition.
3. Port Logistics: highest-demand service term; keep distinct from Port Coordination.
4. Vessel Delivery: disambiguate "delivery to vessel" vs boat delivery; use "cargo delivery to vessels".
5. Customs Clearance: secondary customs terms only; keep "coordination" wording; no broker claim.
6. Cargo Transportation: clarify shore-side scope.
7. Warehousing: coordination wording only; no ownership or capacity claims.
8. Port Coordination: distinct from Port Logistics; avoid agency language.
9. Industries: audience language; evaluate a ship-chandler page only if OAR supplies content.
10. Why OAR
11. About
12. Ports (explanatory only; no location targeting)
13. Insights (structure; no articles yet)
14. Contact
15. Request a Quote (minimal; keep generic)

Constraints for 8C: no superlatives or scale claims ("leading", "best", "largest"), no location modifiers beyond "UAE", no new routes, no FAQ or schema until 8D, no keyword stuffing; titles and descriptions stay unique.

## Appendix A. Keyword-to-Page Master Map

| Keyword / topic | Intent | Priority | Target page | Supporting page | Geo modifier | Evidence required | Cannibalization risk |
|---|---|---|---|---|---|---|---|
| OAR Shipping | Brand | Tier 1 | `/` | `/about`, `/contact` | UAE (optional) | None; resolve "OAR" entity confusion | Low |
| marine logistics UAE | Commercial (category) | Tier 1 | `/` | `/services`, `/why-oar` | UAE | Approved positioning (met) | Medium |
| marine logistics and port execution | Brand + category | Tier 1 | `/` | `/about` | UAE | Met | Medium |
| port logistics UAE | Commercial | Tier 1 | `/services/port-logistics` | `/services`, `/` | UAE | Service verified in approved content | High with port coordination |
| cargo delivery to vessel / vessel supply logistics | Commercial | Tier 1 | `/services/vessel-delivery` | `/industries`, `/` | UAE | Service in approved content | Medium |
| vessel delivery UAE | Commercial (ambiguous) | Tier 2 | `/services/vessel-delivery` | none | UAE | Needs disambiguation | Medium |
| marine customs clearance UAE | Commercial | Tier 2 | `/services/customs-clearance` | `/services` | UAE | Licence/capability verification | Low |
| customs clearance UAE (generic) | Commercial (broad) | Not targeted | none | none | none | n/a | n/a |
| marine cargo warehousing UAE | Commercial | Tier 2 | `/services/warehousing` | `/services/vessel-delivery` | UAE | Warehouse facts verified | Low |
| port cargo transport UAE | Commercial | Tier 2 | `/services/cargo-transportation` | `/services/port-logistics` | UAE | Verified transport arrangements | Medium |
| marine cargo transportation UAE | Commercial (sea freight meaning) | Not targeted | none | none | none | n/a | n/a |
| port call coordination UAE | Commercial + informational | Tier 2 | `/services/port-coordination` | `/insights` (future) | UAE | Agency status clarified | High with port logistics |
| ship supply logistics | Commercial / audience | Tier 2 | `/industries` (chandler section) | `/services/vessel-delivery` | UAE | Chandler workflow detail | Low |
| logistics for ship managers / chandlers / agents | Audience | Tier 2 | `/industries` | service pages | UAE | None beyond current content | Low |
| port logistics / vessel delivery / customs quote UAE | Transactional | Tier 2 | `/request-a-quote` | service pages (CTA) | none | None | Medium with services if titled by service |
| what is port logistics | Informational | Tier 3 | future Insights article | `/services/port-logistics` | none | OAR-approved content | Medium |
| how vessel delivery works | Informational | Tier 3 | future Insights article | `/services/vessel-delivery` | none | OAR-approved content | Medium |
| Fujairah / Khorfakkan / Jebel Ali marine or port logistics | Local | Blocked | none yet (future verified location content) | `/ports` | named port | Verified coverage and port-specific content | n/a |
| shipping company; logistics company; freight company; cargo company | Broad | Not targeted | none | none | none | n/a | n/a |

## Appendix B. Terms Evaluated and Not Targeted

- **shipping company / shipping / ship company:** attracts carriers, agencies and vessel owners; OAR does not operate vessels or act as a carrier. Misleading.
- **logistics company / freight company / cargo company:** broad, dominated by forwarders and 3PLs; OAR is a specialist coordinator for vessel-bound cargo. The words may appear naturally but are not targets.
- **ship supply, ship chandler, ship chandlery:** the searcher wants the supplies themselves. OAR serves chandlers; target "logistics for" phrasing only.
- **ship delivery / yacht delivery:** commonly means delivering a vessel, not cargo.
- **customs clearance UAE (generic) / customs broker:** broker intent; OAR describes coordination, and no licence is verified.
- **marine cargo transportation / coastal shipping:** sea carriage; OAR describes shore-side legs.
- **shipping agency / port agent / husbandry:** a different service category; no evidence OAR is an agent.
- **tracking, live port status, fastest/best/leading:** unsupported by functionality or evidence.

## Appendix C. Entity Relationships (for later internal linking)

```
OAR Shipping (entity)
├─ category: Marine Logistics & Port Execution (UAE)
├─ journey: Supplier → OAR → Vessel
├─ services: Port Logistics ↔ Port Coordination
│            Vessel Delivery ← Cargo Transportation ← Warehousing
│            Customs Clearance (documentation alongside all of the above)
├─ audiences: Ship Managers · Ship Chandlers / Marine Suppliers · Shipping Agents
│             (secondary) Freight Forwarders / Logistics · Marine & Offshore
├─ ports: UAE Ports (unverified; no port entities yet)
└─ conversion: every service and audience page → Request a Quote
```

Suggested later linking: homepage → services hub and the three primary audiences; each service → its two or three closest services and `/request-a-quote`; `/industries` → the services each audience relies on; Insights articles (future) → one service page each. Not implemented in this phase.

## Appendix D. SERP Review Log

Searches run 2026-10-06 via web search (US-only): "marine logistics company UAE", "port logistics services UAE", "vessel delivery ship supply logistics UAE", "marine customs clearance UAE vessel", "port call coordination what is port logistics". Observed result types: company homepages and service pages of established operators; directories and "top companies" lists; port-operator and port-information pages; ship chandler sites for supply queries; customs explainers and yacht-clearance services; port-call explainers and software-vendor guides. Metrics from keyword tools: Not available.

## Phase 8C Implementation Notes

Implemented 2026-10-06 against this blueprint. Only existing pages were edited; no routes, slugs, schema, analytics or new pages were added.

**Terminology decisions**
- Service pages carry a plain-language definition in their lead paragraph (`hero.description` in `src/content/services/*.ts`) and a search-language `metaTitle` (new required field on `ServiceDetailContent`, validated in `content-validation.ts`).
- Vessel Delivery states that it means delivery of cargo and supplies *to* a vessel, not delivery of a vessel. Slug unchanged.
- Cargo Transportation states that it is shore-side movement and not ocean freight. "Marine cargo transportation" is not used.
- Customs Clearance is described as coordination with the relevant parties; no broker or licence wording.
- Warehousing is described as coordination of receiving, storage and staging; no ownership, bonded-storage or capacity wording. The capability summary was changed from "Provide a coordinated point" to "Coordinate the holding and preparation".
- Port Logistics = movement and handling of cargo through the port-side journey; Port Coordination = timing, documentation, transport and communication between parties. Port Coordination states it is not a port authority.
- Geography: only "UAE" is used. The homepage titles and descriptions name ship managers, ship chandlers and shipping agents as audiences, not as OAR's own classification.

**Deferred / unresolved**
- Possible future slug review for `vessel-delivery` (ambiguity) and `cargo-transportation`; not changed (no redirects without evidence).
- Port pages, a ship-chandler audience page, Insights articles and location SEO remain deferred pending OAR verification (see section 10).
- `oarports.com`: business verification required. It is not linked, redirected to or referenced anywhere on the site; determine whether it is OAR's legacy domain or an unrelated entity before any redirect mapping.
- Image alt text: the site currently publishes no content images (hero and service images are unset), so there is no alt text to optimise; add descriptive alt text when approved assets are added.

## Phase 8D Structured Data Notes

Implemented 2026-10-06. Code: `src/lib/seo/structured-data.ts` (typed builders and safe serialisation), `src/components/seo/json-ld.tsx` (server-rendered script), wired into the homepage, `Breadcrumbs` and `ServiceDetail`. The name used everywhere is "OAR Shipping" (`siteConfig.name`).

**Implemented**
- Homepage: one `@graph` with `Organization` (`@id` `{origin}/#organization`; `name`, `url`, `description` = the visible hero line, `logo` = `/images/brand/oar-logo.png`) and `WebSite` (`@id` `{origin}/#website`; `url`, `name`, `inLanguage`, `publisher` → the Organization).
- Each service page: `Service` (`@id` `{page URL}#service`; `name`, `description` = the visible lead definition, `url`, `provider` → Organization `@id`), all from `src/content/services/`.
- `BreadcrumbList` on every page that shows the visible breadcrumb component: `/services`, the six service pages, `/ports`, `/insights`, `/contact`, `/request-a-quote` (and future port and insight detail pages).
- With no valid production origin (`NEXT_PUBLIC_SITE_URL`), no JSON-LD is emitted at all.

**Intentionally omitted**
- `LocalBusiness`: deferred pending a verified business address, contact identity and operating details.
- `FAQPage`: the service-page FAQs are visible, but they are generic intake guidance rather than substantive Q&A, and FAQ rich results are restricted by current search-engine guidance. No benefit justifies the risk.
- `Article`, `Place`/port entities: the Insights and Ports collections are empty.
- `Review`, `AggregateRating`, `Offer`/`Product`/price, `SearchAction` (there is no site search), `ContactPoint`, `sameAs`, `areaServed`, `legalName`, address, telephone, email, founding date, employee count: no verified data.
- `BreadcrumbList` on `/about`, `/why-oar` and `/industries`: those pages do not show a visible breadcrumb, so none is marked up (no UI change was made).

**Entity strategy:** one Organization declared once on the homepage; services reference it by `@id` instead of repeating it. Entity IDs are derived from the configured origin and are stable.

**Still requires OAR verification before any schema change:** legal name, phone, email, address, office hours, official social profiles, ports and cities served, customs licence/capabilities, warehouse ownership/capabilities, agent status, and the `oarports.com` relationship (not used as `sameAs` or anywhere else).

## Phase 8G Implementation Notes

Phase 8G (2026-10-07) was an audit with one copy change: the About page now opens its positioning section with a plain definition of OAR Shipping, marine logistics and port execution (answer-first, UAE only). No pages, schema, keywords or business claims were added. Full findings, the AEO question matrix, the future article roadmap and the verification blockers are in `geo-aeo-content-audit.md`.
