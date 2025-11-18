import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { NextResponse } from "next/server";

// --- Types ---
export interface AuthTokenPayload extends JWTPayload {
  sub: string;
}

// --- JWT Signing ---
export const signAuthToken = async (userId: string): Promise<string> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
};

// --- JWT Verification ---
export const verifyAuthToken = async (
  token: string
): Promise<AuthTokenPayload | null> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as AuthTokenPayload;
  } catch {
    return null;
  }
};

// --- Set Cookies ---
export const setAuthCookie = (res: NextResponse, token: string) => {
  res.cookies.set("egov_auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
};

// --- Set Cookies ---
export const clearAuthCookie = (res: NextResponse) => {
  res.cookies.delete("egov_auth");
  return res;
};
