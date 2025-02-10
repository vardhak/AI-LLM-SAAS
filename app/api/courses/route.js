import { db } from "@/configs/db";
import { STUDY_DATA_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { createdBy } = await req.json();

  try {
    const result = await db
      .select()
      .from(STUDY_DATA_TABLE)
      .where(eq(createdBy, STUDY_DATA_TABLE.createdBy))
      .orderBy(desc(STUDY_DATA_TABLE.id));

    return NextResponse.json({ result: result });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}

export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const courseId = searchParams?.get("courseId");

  try {
    const course = await db
      .select()
      .from(STUDY_DATA_TABLE)
      .where(eq(STUDY_DATA_TABLE?.courseId, courseId));

    return NextResponse.json({ course: course[0] });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
