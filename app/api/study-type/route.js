import { db } from "@/configs/db";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, studyType } = await req.json();

  if (studyType == "ALL") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

    const flashCard = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));

    // get all other data

    const result = {
      notes: notes,
      flashcard: flashCard?.find((item) => item.type == "flashcard"),
      quiz: flashCard?.find((item) => item.type == "quiz"),
      qa: flashCard?.find((item) => item.type == "qa"),
      status: "READY",
    };

    return NextResponse.json(result);
  }

  if (studyType == "notes") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

    return NextResponse.json(notes);
  }
}
