# Phase 9E: Security QA

Date: 2026-10-07. Internal engineering audit. It makes no claims for use on the website; no security statement was added to any page.

## Executive summary

- **Overall status:** no exploitable vulnerability was found. No P0, P1 or P2 findings. Launch is **not blocked** by security.
- **Highest severity finding:** P3 (four low-risk hardening items, three fixed in this phase, one documented).
- **Changes made:** a baseline Content-Security-Policy, `X-Frame-Options: DENY` and `Cross-Origin-Opener-Policy: same-origin` (`next.config.ts`); a 405 method gate on the three dynamic route families (`src/proxy.ts`); removal of nine empty `.gitkeep` files from `public/`, which answered 500 when requested.
- Production dependency audit: 0 vulnerabilities. The five findings in the full audit are development-only lint tooling.
- No dependency was added; no routes, SEO, schema, content or design changed.

## Threat model

**Public attack surface:** 15 static pages; `/services/[slug]`, `/ports/[slug]` and `/insights/[slug]` (unknown slugs 404; ports and insights have no entries); the not-found page; `robots.txt` and `sitemap.xml`; `src/proxy.ts` (runs only on the three slug families); static assets under `/_next/static` and `public/`; response headers; JSON-LD script blocks. There are no API routes, no route handlers, no cookies, no local or session storage, no query-parameter or search handling, no filesystem reads, no third-party requests.

**RFQ attack surface (highest risk):** one Server Action, `submitQuote`, reachable by anyone who can POST to `/request-a-quote` with the `Next-Action` header; the hidden honeypot field; the server-side Zod schema; the Resend call to a trusted recipient from environment variables; email HTML and text bodies; structured logs.

**Trust boundaries:** browser to Server Action (untrusted); Server Action to Resend (trusted configuration plus validated data); environment variables (trusted, server-only); content files (trusted, committed); everything in the request (body, headers, URL) is untrusted.

## Tests performed

All run against the production build with temporary scripts that have been deleted; email was captured by a local mock provider (no real email sent); no real credentials exist.

| Area | Test | Result |
|---|---|---|
| Baseline | `npm ci`, lint, typecheck, build, `npm audit --omit=dev` | pass; 0 production vulnerabilities |
| RFQ validation | 27-case harness (unconfigured/configured/tampered/oversize/honeypot/injection/provider failure/cross-origin/missing variables/logs) | 27/27 |
| RFQ security battery | 69 cases (below) | 69/69 |
| Injection | 16 payloads x 9 text fields = 144 deliveries: `</td><script>`, `"><img onerror>`, `\r\nBcc:` in text fields, ` `/` `, fullwidth `＜script＞`, RTL override, `javascript:` URIs, template syntax, SQL, NUL/BEL plus SVG onload, URL-encoded CRLF, comment and CDATA closers, entity text | no raw markup in the email HTML (dangerous characters are escaped), subject, From, To and Reply-To unchanged |
| Email field | 21 variants: CRLF, LF, URL-encoded CRLF, comma and semicolon lists, display-name form, angle brackets, IDN/Unicode, RTL override, double dots, bare TLD, bracket IP, 300-char local part, NUL, padding spaces, uppercase | only well-formed single addresses accepted (`a@b.com`, trimmed and uppercase variants); every other variant rejected; accepted Reply-To always a single plain address |
| Special keys | `__proto__`, `constructor.prototype`, `prototype`, `toString`/`valueOf`/`hasOwnProperty` overrides, object/array in string fields, object as service | handled; nothing reaches the email; server stays healthy; extra keys are stripped by the schema |
| Flight payloads | 27 malformed or hostile bodies: truncated JSON, `$undefined`, `$NaN`, `$n`, `$D`, `$@`, `$F`, `$K`, `$B`, `$Q`, `$S`, `$1`, `$1:__proto__`, `$1:constructor:constructor`, `$$escaped`, triplicated and 20-deep nesting, 5,000-deep brackets, control characters, HTML, form-encoded | no payload delivered mail unless it was a valid request; errors were generic 500/200 with no stack, path or secret; server healthy afterwards |
| Size / DoS | 900 KB email (three pathological shapes), 200k astral characters, 900k digits, 900k spaces, 900k-character service, 1.2 MB body | every case answered in 6-31 ms; the 1.2 MB body is rejected in 10 ms by the framework limit |
| Abuse | 40 simultaneous valid submissions | all 40 delivered: there is no application rate limit (documented below) |
| Logs | server log after all of the above | no PII, payload fragments, addresses or secrets (3.3 KB of event codes) |
| Origin/Host | 16-case matrix with raw requests | see RFQ security |
| Routing | 30 traversal and sensitive-file paths (`.env`, `.git/config`, `package.json`, `src/`, `docs/`, `node_modules`, encoded `..`, backslashes, NUL, `.next/`), source maps | all 404; no file content served |
| Redirects | 16 redirect probes (case variants, `//host`, `/%2F%2Fhost`, `?next=//host`, CRLF, backslash, `javascript:`/`data:` slugs, hostile `Host`/`X-Forwarded-Host`) | every `Location` is a relative path; no host reflected; CRLF stays percent-encoded; no open redirect |
| Methods | 8 methods x 8 paths | see Route / HTTP method security |
| Headers | recorded for `/`, `/zzz`, `/request-a-quote`, CSS, image, `robots.txt` | see Security headers |
| CSP | headless Chrome on 7 page/viewport combinations including menu and RFQ failure submit; injected external script, image, fetch, `<base>`, cross-origin form post and cross-origin framing | no violations in normal use; every injected external load blocked |
| Secrets | see Secrets audit | clean |
| Dependencies | `npm audit --omit=dev`, `npm audit`, install scripts, duplicates | see Dependency audit |
| SEO/regression | 15 routes 200 with canonical, robots, one H1, JSON-LD and CSP header; sitemap 15 URLs; invalid routes 404; case variant 308; malformed 404 (configured test origin) | pass |

## Findings

| ID | Severity | Description | Evidence | Fix |
|---|---|---|---|---|
| S1 | P3 | No Content-Security-Policy; `X-Frame-Options` was `SAMEORIGIN`; no COOP. No framing restriction and no cap on loading or connecting to other origins. | Header capture of `/` | Added a baseline CSP in production, `X-Frame-Options: DENY`, `Cross-Origin-Opener-Policy: same-origin` (`next.config.ts`). Verified: `frame-ancestors 'none'` blocked embedding from another origin (page and `robots.txt`); injected external script, image, fetch, base URI and cross-origin form were blocked; zero violations in normal use (hydration, menu, RFQ submit, fonts, logo). `script-src` still needs `'unsafe-inline'` (see below). |
| S2 | P3 | Content routes (`/services/*`, `/ports/*`, `/insights/*`) answered POST/PUT/DELETE/PATCH with the page (200), OPTIONS with an empty 400, TRACE with 500. | Raw-request method matrix | `src/proxy.ts` now returns 405 with `Allow: GET, HEAD` for other methods. POST/PUT/DELETE/PATCH/OPTIONS now 405. TRACE still returns a generic 500 ("Internal Server Error", no detail) apparently because the Fetch API refuses to construct a TRACE request inside Next's proxy layer (not confirmed in framework source); it echoes nothing, so cross-site tracing is not possible. Block TRACE at the host or edge. |
| S3 | P3 | Empty `.gitkeep` files in `public/` were served and answered HTTP 500 (a plain "Internal Server Error", no leak). | `GET /images/hero/.gitkeep` -> 500 | Removed the nine placeholder files; `public/` now contains only `images/brand/oar-logo.png`. The directories remain. Requests now 404. |
| S4 | P3 | No application-level rate limit on the RFQ Server Action. | 40 simultaneous valid requests delivered 40 emails | Not changed (see RFQ security and Post-launch hardening). |
| Note | n/a | `script-src` and `style-src` include `'unsafe-inline'`. | Next.js bootstrap scripts are inlined into static HTML | Documented limitation: there is no XSS vector in the application today (no user-controlled markup is rendered), but the CSP does not defend against injected inline script. A nonce or hash policy would require dynamic rendering of every page, which would give up static generation. |

No finding is exploitable for data theft, account compromise, code execution, XSS, open redirect, header injection or secret disclosure.

## Security headers (observed, production)

On `/`, `/zzz`, `/request-a-quote`, CSS, image and `robots.txt`:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000
Cross-Origin-Opener-Policy: same-origin
```

No `X-Powered-By`, no `Server` version, no `Set-Cookie`, no `Access-Control-*` header on any response, including cross-origin OPTIONS and POST probes. The CSP is emitted in production only (development needs eval and websockets). Recommendations (not changed because they depend on the final domain): add `includeSubDomains` (and later `preload`) to HSTS once every subdomain is HTTPS; HSTS only takes effect over HTTPS at the production host. Vercel preview deployments inject their own toolbar scripts that this CSP will block, which is harmless.

## RFQ security

- **Exposure:** a Server Action (`"use server"`), not an API route; `/api/quote` and every `/api/*` path return 404. The action id is public in the client bundle, so it is treated as callable by anyone.
- **Server validation:** every call is re-parsed with the same Zod schema; unknown keys are stripped, wrong types and enum values rejected, and trimmed length limits enforced (95 server-side cases passed in Phase 9A, 69 more here).
- **Origin protection:** Next.js compares the `Origin` host with `Host` (or `X-Forwarded-Host`). Matrix: same origin accepted; `Origin: null`, other hosts, suffix-confusion hosts (`127.0.0.1:3000.evil.invalid`), encoded hosts, malformed and garbage values: rejected with a generic 500; mismatching `X-Forwarded-Host`: rejected. Accepted: no `Origin` header (non-browser client), an alternate scheme on the same host (the check compares hosts), and matching attacker-chosen `Host`/`Origin` or `X-Forwarded-Host`/`Origin` pairs, all of which require a client that can set arbitrary headers and so are not a CSRF vector.
- **CSRF:** a cross-site browser cannot call the action: the request needs the custom `Next-Action` header, which forces a CORS preflight; the site answers OPTIONS with 405 and no `Access-Control-*` headers, so the browser blocks the real request; the Origin check is a second layer. A custom CSRF token was therefore not added.
- **Honeypot:** a filled hidden field returns the normal success response and sends nothing; whitespace-only values are not treated as spam; the field is inert, `aria-hidden` and `tabindex=-1`.
- **Email construction:** subject is fixed from the canonical service title; From and recipient come only from environment variables; Reply-To is the validated single address; customer text appears only in the body, HTML-escaped (`& < > " '`) with a literal plain-text twin; customer values never reach headers. Newlines in text fields stay in the body.
- **Secrets and errors:** failure responses are generic; provider error text and environment names never reach the client; logs hold event codes and variable names only.
- **Abuse:** protection is the honeypot, origin check and strict validation. There is no persistence, so no data store can be filled, but an unauthenticated script can trigger one email per request. This does not block launch; add limits at the host or edge and provider side (see below).

## Secrets audit

Checked: `.env.example` (names only, no values), `README.md`, `docs/`, `src/`, `public/`, `next.config.ts`, `package.json`, the whole `.next` build output. Results: no `.env` file in the project and `.env`, `.env.local`, `.env.*.local` are git-ignored; no `NEXT_PUBLIC_` variable other than the site URL and the reserved analytics id; zero occurrences of `RESEND_API_KEY`, `OAR_RFQ_RECIPIENT_EMAIL`, `OAR_RFQ_FROM_EMAIL`, `resend`, `api.resend` in `.next/static`, prerendered HTML, RSC payloads or `public/`; the three variable names appear only in two server chunks (`.next/server/chunks/ssr`); no source maps in `.next/static` (107 maps exist only under `.next/server` and `.next/build`, which are not served; the server returns 404 for map URLs); no API-key, private-key, token or JWT patterns in the repository; no email addresses in source, docs or client output; no absolute filesystem paths, `localhost` or `127.0.0.1` in client bundles or prerendered HTML. Deployment note: do not publish `.next/server` source maps.

## XSS audit

The only `dangerouslySetInnerHTML` is the JSON-LD script component. Its serializer escapes `<` (so `</script>` or `<!--` can never appear) and U+2028/U+2029; `>` and `&` cannot terminate a script block. Its input is committed content, not user input. No `innerHTML`, `eval`, `new Function`, `document.write`, iframes, `window.open` or `target=_blank`; no rendering of user-supplied values anywhere (the confirmation page shows fixed copy; form values only go back into form controls); no user-controlled `href` or `src`; no markdown renderer.

## Dependency audit

- `npm audit --omit=dev`: **0 vulnerabilities** (29 production packages, none with install scripts; React 19.2.8 and Next.js 16.3.8, both at or above the releases that, to my knowledge, patched the late-2025 Server Components decoding vulnerabilities; not independently re-verified against advisories in this phase).
- `npm audit` (all): 5 high, all development-only lint tooling: `eslint-config-next` (direct), `@next/eslint-plugin-next`, `fast-glob`, `micromatch`, `braces` (stack-exhaustion DoS on pathologically nested glob patterns). They run only on developer machines against local source; they are not in the production bundle. The suggested "fix" downgrades `eslint-config-next` to 14.2.35 (a major downgrade); it was not applied (no `audit fix --force`).
- Install scripts: only `unrs-resolver`, development-only. No duplicate packages in the production tree. Six optional WebAssembly helper packages show as "extraneous" in `npm ls`; they are optional platform fallbacks recorded in the lockfile (sharp WASM) and are inert.
- All production dependencies are used: Next/React, React Hook Form with its resolver and Zod (RFQ form and server schema), `lucide-react` (icons), `resend` (server only).

## Route / HTTP method security

| Target | GET/HEAD | POST/PUT/DELETE/PATCH | OPTIONS | TRACE |
|---|---|---|---|---|
| Static pages, `robots.txt`, `sitemap.xml` | 200 | 405 (`Allow: GET, HEAD`) | 405 | 405 |
| `/request-a-quote` | 200 | 405 for ordinary POST; the Server Action POST (with `Next-Action`) works | 405 | 405 |
| `/services/*`, `/ports/*`, `/insights/*` | 200 or 404 | 405 (was 200) | 405 (was 400) | generic 500 |
| `/api/*`, unknown paths | 404 | 404 | 404 | 404 |
| Sensitive paths and traversal | 404 | n/a | n/a | n/a |

No CORS headers on any response. No accidental API endpoint. Malformed escapes return the normal 404; case variants redirect with a relative `Location`.

## Regression

- Functional (9A): 15 routes 200; invalid routes 404; case variants 308; malformed escapes 404; RFQ 27/27 and 69/69; mobile menu opens (verified in headless Chrome with CSP active); RFQ failure path works (the Server Action POST is allowed by `connect-src 'self'`).
- SEO: with a configured test origin all 15 pages kept their canonical, `index, follow`, one H1, JSON-LD and the new headers; the sitemap has 15 URLs and `robots.txt` points to it; unconfigured builds remain `noindex`.
- Responsive and accessibility (9B, 9C): no markup, CSS or component change; headers only. A targeted check was not repeated visually.
- Lint, typecheck, build pass; `npm audit --omit=dev` 0.

## Remaining P3 and post-launch hardening

1. Rate limiting for the RFQ: configure at the host or CDN (per-IP limits on POSTs to `/request-a-quote`) and use the email provider's limits and sender controls; add application-level limits only if abuse appears (this would need shared state).
2. Tighten HSTS (`includeSubDomains`, then `preload`) once the production domain and its subdomains are decided.
3. Block TRACE at the host or edge (the app's generic 500 is harmless).
4. If a stricter CSP is wanted later, adopt nonces or hashes together with a rendering change; today `unsafe-inline` for scripts and styles is required.
5. Do not deploy `.next/server/**/*.map`.
6. The development-only audit findings can be cleared when `eslint-config-next` publishes a fixed 16.x release.

## Launch blockers

None from a security standpoint.

## Not performed

- A penetration test against the real deployed host, CDN or WAF behaviour, TLS configuration and DNS.
- Real email delivery (mock provider only; no credentials exist).
- Testing in browsers other than Chrome.
- Checks of the hosting platform's own headers or caching layer.
