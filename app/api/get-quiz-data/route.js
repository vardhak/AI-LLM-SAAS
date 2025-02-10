import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, studyType } = await req.json();

  try {
    const dbResult = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE?.type, studyType)
        )
      );

    return NextResponse.json({ res: dbResult });
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}
