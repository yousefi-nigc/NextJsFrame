import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard/admin")) {
    // Check for session cookie (lightweight check without Prisma)
    const sessionCookie = getSessionCookie(request);

    // If no session cookie, redirect to login
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Note: Full session validation and admin check is done in the API routes and pages
    // to avoid Prisma edge runtime issues in middleware
    // The actual admin verification happens server-side in API routes
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/admin/:path*",
  ],
};

