import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Normalize any variant of /images/products/ or /Images/Products/
  // to the canonical /images/Products/ path that exists on disk.
  const normalized = pathname
    // First lower-case the /images/ segment (handles /Images/)
    .replace(/^\/[Ii]mages\//, "/images/")
    // Then fix the /products/ segment to /Products/ (capital P)
    .replace(/^\/images\/[Pp]roducts\//, "/images/Products/");

  if (normalized !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = normalized;
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Only run on image asset paths to keep overhead minimal
  matcher: ["/images/:path*", "/Images/:path*"],
};
