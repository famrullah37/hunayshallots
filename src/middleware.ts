import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Note: middleware runs on the Edge runtime — we use a lightweight Redis check via fetch.
// The actual session validation happens via the auth action (server-side).
// Middleware does a quick cookie presence check; full validation is in Server Components.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token");
    if (!token?.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
