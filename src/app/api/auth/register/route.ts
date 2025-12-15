import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { setAuthCookie, signAuthToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const body: {
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
      municipality?: string;
      ward?: string;
    } = await request.json();
    const { fullName, email, phone, password, municipality, ward } = body;

    
    if (!fullName || !email || !phone || !password || !municipality || !ward) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the new user
    const created = await User.create({
      fullName,
      email,
      phone,
      passwordHash,
      municipalityId: municipality,
      ward,
    });

    // Generate auth token and set cookie
    const token =  await signAuthToken(String(created._id));
    const res = NextResponse.json({ message: "Registered successfully" }, { status: 201 });
    setAuthCookie(res, token);

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
