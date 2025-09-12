import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.warn(
    "JWT_SECRET is not set. Set it in your environment for auth."
  )
}
console.log(JWT_SECRET)

// --- Types ---
interface AuthTokenPayload {
  sub: string
}

// --- JWT Signing & Verification ---
export const signAuthToken = (userId: string): string => {
  const payload: AuthTokenPayload = { sub: userId }
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "7d" })
}

export const verifyAuthToken = (token: string): AuthTokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as AuthTokenPayload
  } catch {
    return null
  }
}

// --- Setting & Clearing Cookies ---
export const setAuthCookie = (response: NextResponse, token: string) => {
  const sevenDays = 60 * 60 * 24 * 7
  response.cookies.set("egov_auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sevenDays,
  })
  return response
}

export const clearAuthCookie = (response: NextResponse) => {
  response.cookies.delete("egov_auth")
  return response
}

// --- Getting Token from Cookies ---
export const getAuthTokenFromCookies = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies()
    return cookieStore.get("egov_auth")?.value || null
  } catch {
    return null
  }
}
