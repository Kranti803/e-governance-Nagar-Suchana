import { connectToDatabase } from "@/lib/db";
import { Notice } from "@/models/Notice";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const { title, category, summary, content, publishDate } =
      await request.json();

    if (!title || !category || !summary || !content || !publishDate) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const parsedDate = new Date(publishDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid publish date" },
        { status: 400 }
      );
    }

    const notice = await Notice.create({
      title,
      category,
      summary,
      content,
      publishDate: parsedDate,
    });

    return NextResponse.json(
      { message: "Notice created", notice },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating notice:", error);
    return NextResponse.json(
      { message: "Failed to create notice" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectToDatabase();
    const notices = await Notice.find().sort({ publishDate: -1 }).lean();
    return NextResponse.json({ notices });
  } catch (error) {
    console.error("Error fetching notices:", error);
    return NextResponse.json(
      { message: "Failed to fetch notices" },
      { status: 500 }
    );
  }
};

