import { connectToDatabase } from "@/lib/db";
import { Notice } from "@/models/Notice";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// GET /api/notices/[id]
export const GET = async (
  _req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid notice id" }, { status: 400 });
    }

    await connectToDatabase();
    const notice = await Notice.findById(id).lean();

    if (!notice) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ notice });
  } catch (error) {
    console.error("Error fetching notice:", error);
    return NextResponse.json({ message: "Failed to fetch notice" }, { status: 500 });
  }
};

// PATCH /api/notices/[id]
export const PATCH = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid notice id" }, { status: 400 });
    }

    const body: {
      title?: string;
      category?: string;
      summary?: string;
      content?: string;
      publishDate?: string;
    } = await req.json();

    const { title, category, summary, content, publishDate } = body;

    await connectToDatabase();

    const update: Partial<{
      title: string;
      category: string;
      summary: string;
      content: string;
      publishDate: Date;
    }> = {};

    if (title !== undefined) update.title = title;
    if (category !== undefined) update.category = category;
    if (summary !== undefined) update.summary = summary;
    if (content !== undefined) update.content = content;
    if (publishDate !== undefined) {
      const parsedDate = new Date(publishDate);
      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json({ message: "Invalid publish date" }, { status: 400 });
      }
      update.publishDate = parsedDate;
    }

    const notice = await Notice.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!notice) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Notice updated", notice });
  } catch (error) {
    console.error("Error updating notice:", error);
    return NextResponse.json({ message: "Failed to update notice" }, { status: 500 });
  }
};

// DELETE /api/notices/[id]
export const DELETE = async (
  _req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid notice id" }, { status: 400 });
    }

    await connectToDatabase();
    const result = await Notice.findByIdAndDelete(id).lean();

    if (!result) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Notice deleted" });
  } catch (error) {
    console.error("Error deleting notice:", error);
    return NextResponse.json({ message: "Failed to delete notice" }, { status: 500 });
  }
};
