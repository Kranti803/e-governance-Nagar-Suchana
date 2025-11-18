import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("egov_auth")?.value;
  const payload = token ? await verifyAuthToken(token) : null;

  
  if (pathname.startsWith("/dashboard")) {
    if (!payload) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  
  if (pathname === "/login" || pathname === "/register") {
    if (payload) { // Already logged in
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
