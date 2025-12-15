import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

type Params = { params: { id: string } };

export const DELETE = async (_req: Request, { params }: Params) => {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.role === "admin") {
      return NextResponse.json(
        { message: "Cannot delete admin user" },
        { status: 403 }
      );
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
};

