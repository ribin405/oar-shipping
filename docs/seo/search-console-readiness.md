# OAR Shipping Search Console & Indexing Readiness

Phase 8F audit, 2026-10-06. Nothing here has been done in Google Search Console; no property, verification token or credentials exist in the project. The test origin `https://example.com` was used only for local verification and is not an OAR domain.

## 1. How the site decides what to publish

All SEO URLs derive from one setting, `NEXT_PUBLIC_SITE_URL`, parsed once in `src/lib/site-config.ts` (inlined at build time, so set it in the build environment).

| Value | Result in a production build |
|---|---|
| `https://example.com`, `https://example.com/`, `https://example.com/test?x=1` | Origin `https://example.com` (path, query and hash dropped) |
| missing, `example.com`, `http://example.com`, `https://localhost:3000` | Treated as unconfigured: no canonical, `og:url`, sitemap or JSON-LD URLs; `robots.txt` = `Disallow: /`; empty sitemap; pages `noindex, nofollow` |
| Valid origin but `VERCEL_ENV` is `preview` or `development` | Same protection: `Disallow: /`, empty sitemap, `noindex, nofollow` |
| Valid origin and production (or no `VERCEL_ENV`) | `Allow: /`, sitemap reference, `index, follow` |

Local development (`next dev`) falls back to `http://localhost:3000` and never reaches production output. Production never falls back to localhost.

## 2. Verified in code (local production build, test origin)

- `robots.txt`: `User-Agent: *`, `Allow: /`, `Sitemap: {origin}/sitemap.xml`; nothing blocked, including `/_next/` and images.
- `sitemap.xml`: well-formed, correct namespace, 15 URLs, no duplicates, all HTTPS on the configured origin, no query strings, no `lastmod`, `changefreq` or `priority` (no trustworthy dates exist). It equals the route list exactly. `/ports/[slug]` and `/insights/[slug]` entries appear only when real entries exist (none today); the `/ports` and `/insights` index pages are listed.
- Every page returns 200 with a self-referencing canonical, `og:url` equal to the canonical, and `index, follow`. Query variants (`/services?foo=bar`) canonicalise to the clean path. Trailing-slash URLs 308-redirect to the slash-less canonical.
- 404s: `/services/nope`, `/ports/nope`, `/insights/nope`, `/zzz`, `/api/quote` and `/sitemap` return 404, `noindex`, no canonical, no JSON-LD. There is no `/api/quote` route (the quote form uses a Server Action).
- JSON-LD URLs (Organization, WebSite, Service, BreadcrumbList) all use the configured origin.
- Build output scan: no `RESEND_API_KEY`, `OAR_RFQ_*` names or provider URLs in client bundles or prerendered HTML; no `localhost`, `127.0.0.1` or `vercel.app` SEO URLs. (One client chunk contains the string "localhost" inside Next.js's own URL-parsing code, not a URL.)
- RFQ delivery tests (27 cases: validation, honeypot, safe failure, origin check, escaping) still pass.

## 3. Indexability matrix (actual results)

| Page | Status | In sitemap |
|---|---|---|
| Home, About, Why OAR, Industries, Services, six service pages, Ports, Insights, Contact, Request a Quote | index, follow | yes (15 URLs) |
| 404 page and invalid dynamic routes | noindex, nofollow | no |
| Design-system reference page | development only, `noindex`; not built in production | no |
| Preview deployments / unconfigured production | noindex, nofollow; robots `Disallow: /` | empty sitemap |

`/request-a-quote` is intentionally indexable (transactional landing page). Robots and page-level directives do not contradict each other: allowed pages are `index`, disallowed environments are also `noindex`.

## 4. Requires production, domain or Google access (not done)

1. **Choose the production domain and the single canonical hostname** (`https://domain` or `https://www.domain`). Not decided; the repository assumes neither. Do not use `oarports.com` unless OAR confirms it is theirs.
2. **Set `NEXT_PUBLIC_SITE_URL`** to that origin in the production build environment and deploy.
3. **HTTP to HTTPS** must be enforced at the hosting/CDN/DNS layer. The app only generates HTTPS URLs when configured with an HTTPS origin.
4. **Alternate host redirect** (`www` and apex) to the canonical host, 301, at the DNS/hosting layer.
5. Search Console property, ownership verification, sitemap submission and monitoring (checklist below).
6. Legacy redirects: see `redirect-map.md` (pending).

## 5. Launch checklist

Before launch
- [ ] Confirm production domain and canonical hostname.
- [ ] Set `NEXT_PUBLIC_SITE_URL`; confirm the production deployment has `VERCEL_ENV=production` (or no `VERCEL_ENV` off Vercel).
- [ ] Confirm HTTPS and certificate; configure the alternate-host redirect and HTTP to HTTPS.
- [ ] Complete the RFQ environment variables (`RESEND_API_KEY`, `OAR_RFQ_RECIPIENT_EMAIL`, `OAR_RFQ_FROM_EMAIL`) and send one live test.
- [ ] Complete the legacy redirect map if a previous site existed.

After deploy
- [ ] Open `/robots.txt`: expect `Allow: /` and `Sitemap: https://{domain}/sitemap.xml`.
- [ ] Open `/sitemap.xml`: 15 URLs on the canonical host, none on another host.
- [ ] View source of `/` and one service page: canonical, `og:url` and JSON-LD use the canonical host; no `noindex`.
- [ ] Confirm the alternate host and `http://` redirect to the canonical HTTPS URL in one hop.

Search Console
- [ ] Add a **Domain property** if OAR controls DNS (covers all hosts and protocols); otherwise a URL-prefix property for the exact canonical origin. Verify ownership (DNS TXT record or HTML tag from Search Console; none exists in the project).
- [ ] Submit `https://{domain}/sitemap.xml` (not `/sitemap`, not a preview URL).
- [ ] URL Inspection: test the live URL and request indexing for the pages below.
- [ ] Monitor Page Indexing, Sitemaps, Core Web Vitals and HTTPS/security reports. Indexing is decided by Google and can take time; no indexing date or ranking is promised, and the sitemap only aids discovery.

## 6. URL Inspection list

Representative pages (the sitemap covers the rest):

```
/
/services
/services/port-logistics
/services/vessel-delivery
/services/customs-clearance
/services/warehousing
/services/cargo-transportation
/services/port-coordination
/industries
/about
/why-oar
/contact
/request-a-quote
```

## 7. Hostname, HTTPS and domain policy

- Exactly one canonical hostname must be chosen before launch; the other must 301 to it at the DNS/CDN/hosting layer. The code does not pick one.
- HTTP to HTTPS is a hosting/edge responsibility. The app already sends `Strict-Transport-Security`.
- `oarshipping.com`, `www.oarshipping.com` and `oarports.com` do not appear in the codebase as configuration. `oarports.com` appears only in SEO documentation as an unresolved relationship and is not linked, redirected to, used as canonical, `sameAs`, sitemap origin or property.

## 8. Remaining launch inputs

Production domain and hostname choice; DNS/hosting access; Search Console ownership access; previous-site URL inventory (if any); the `oarports.com` relationship; verified business and contact details; RFQ environment variables.
