import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keeps the dynamic content routes (/services, /ports, /insights) strict.
 * Slugs are lowercase, but Next.js matches prerendered paths case-insensitively,
 * so `/services/PORT-LOGISTICS` would otherwise answer 200 with the not-found
 * page, and a malformed percent-escape (`/services/%E0%A4%A`) would answer 500.
 * Case variants redirect to the lowercase canonical path; malformed paths get
 * the normal 404. These pages are read-only, so any method other than GET and
 * HEAD is answered with 405 (otherwise POST would render the page and TRACE or
 * OPTIONS would fail with an empty 400 or a 500).
 */
export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new NextResponse(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  const { pathname } = request.nextUrl;

  try {
    decodeURIComponent(pathname);
  } catch {
    return NextResponse.rewrite(new URL("/not-found-malformed-path", request.url));
  }

  const lowercase = pathname.toLowerCase();
  if (pathname !== lowercase) {
    const url = request.nextUrl.clone();
    url.pathname = lowercase;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/services/:slug+", "/ports/:slug+", "/insights/:slug+"],
};
