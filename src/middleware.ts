import { NextRequest, NextResponse } from "next/server"
import { verifyAuthToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("egov_auth")?.value
    const payload = token ? verifyAuthToken(token) : null
    if (!payload) {
      const url = new URL("/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}


