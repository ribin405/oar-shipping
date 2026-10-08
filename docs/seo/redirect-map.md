# OAR Shipping Redirect Map

Status: **pending**. Phase 8F, 2026-10-06.

Legacy redirect mapping remains pending verified access to the previous OAR website URL inventory. Legacy URL inventory pending access to the previous production site or verified URL export. Redirect completeness is not claimed.

## Evidence searched

- The repository (`src`, `next.config.ts`, `README.md`, `docs/`): no redirects, rewrites, legacy routes or old URLs are defined or referenced.
- The OAR strategy report (`OAR_Shipping_Website_Strategy_Report.docx`): describes the previous public site's positioning but lists no OAR URLs. The only URLs it contains belong to competitors and are not evidence about OAR.
- Phase 8B search review: one result on `oarports.com` titled "OAR Technologies" appeared; its content could not be read and its relationship to OAR is unverified. It is not a legacy domain candidate until OAR confirms it.

## Candidate list

| Old URL | New URL | Reason | Confidence | Source |
|---|---|---|---|---|
| none | none | no verified legacy URLs exist | n/a | n/a |

## To complete before launch

1. OAR confirms the previous production domain (or that there was none) and whether `oarports.com` is theirs.
2. Obtain a verified URL export (CMS export, sitemap, server logs or analytics landing pages) of the previous site.
3. Map each old URL to its closest new page: `/`, `/about`, `/why-oar`, `/services` and its six service pages, `/industries`, `/ports`, `/insights`, `/contact`, `/request-a-quote`. Use one 301 per old URL; do not redirect unmatched URLs to the homepage in bulk.
4. Implement at the hosting layer or in `next.config.ts` `redirects()`, then re-crawl to confirm no chains or loops.

No redirects are defined in the application today; the only redirect is Next.js's built-in 308 from a trailing-slash URL to its slash-less form.
