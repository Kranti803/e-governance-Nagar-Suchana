import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const users = await User.find({}, "-passwordHash").lean();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
};

