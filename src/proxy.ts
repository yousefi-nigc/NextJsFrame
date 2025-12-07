import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
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
  }

  return NextResponse.next();
}

export const config = {

  matcher: [
    "/admin/:path*",
    "/dashboard/admin/:path*",
  ],
};
