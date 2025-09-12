import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { setAuthCookie, signAuthToken } from "@/lib/auth";
import { NextResponse } from "next/server";




export const POST = async (request: Request) => {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, password } = body as any;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing credentials" },
        { status: 400 }
      );
    }

    const user = await User.findOne({email});

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signAuthToken(String(user._id));
    const res = NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id, fullName: user.fullName },
      },
      { status: 200 }
    );

    setAuthCookie(res, token);
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
