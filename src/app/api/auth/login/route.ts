import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { setAuthCookie, signAuthToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = await signAuthToken(String(user._id));

    const res = NextResponse.json({ success: true, message: "Login successful" });
    setAuthCookie(res, token);

    return res;

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
