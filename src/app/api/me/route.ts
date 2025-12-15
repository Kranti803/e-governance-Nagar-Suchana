import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { verifyAuthToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const getUserFromRequest = async (request: NextRequest) => {
  const token = request.cookies.get("egov_auth")?.value;
  if (!token) return null;
  const payload = await verifyAuthToken(token);
  if (!payload?.sub) return null;
  return String(payload.sub);
};

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(userId, "-passwordHash").lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const userId = await getUserFromRequest(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fullName, phoneNumber, oldPassword, newPassword } = body as any;

    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (phoneNumber !== undefined) user.phone = phoneNumber;

    if (newPassword) {
      if (!oldPassword) {
        return NextResponse.json(
          { message: "Old password is required" },
          { status: 400 }
        );
      }
      const valid = await bcrypt.compare(oldPassword, user.passwordHash);
      if (!valid) {
        return NextResponse.json(
          { message: "Old password is incorrect" },
          { status: 401 }
        );
      }
      user.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    const sanitized = user.toObject();
    delete (sanitized as any).passwordHash;

    return NextResponse.json({
      message: "Profile updated",
      user: sanitized,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
};

