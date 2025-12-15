import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export const POST = async () => {
  const res = NextResponse.json({ message: "Logged out" });
  clearAuthCookie(res);
  return res;
};

