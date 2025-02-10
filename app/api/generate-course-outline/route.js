import { courseOutlineAiModel, notesGenAiModel4 } from "@/configs/aiModel";
import { db } from "@/configs/db";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_DATA_TABLE,
  usersTable,
} from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    _courseId,
    _topic,
    _courseType,
    _difficultyLevel,
    _createdBy,
    _date,
  } = await req.json();

  // generate course layout using ai
  const PROMPT =
    "Generate the study material for " +
    _topic +
    " for " +
    _courseType +
    " and level of difficulty will be " +
    _difficultyLevel +
    " with summery of course, List of chapters along with summery and emoji icon for each chapter, topic list in list in chapter, all in JSON format.";
  const aiResponse = await courseOutlineAiModel.sendMessage(PROMPT);

  const aiResult = aiResponse.response.text();

  const cleanAiRes = aiResult.replace(/```json\n|\n```/g, "").trim();

  const parsedData = JSON.parse(cleanAiRes);

  //save the result along with user input
  const dbResult = await db
    .insert(STUDY_DATA_TABLE)
    .values({
      courseId: _courseId,
      topic: _topic,
      courseType: _courseType,
      createdBy: _createdBy,
      difficultyLevel: _difficultyLevel,
      courseLayout: parsedData,
    })
    .returning({ resp: STUDY_DATA_TABLE });

  //update the course credits

  // Step 1: Fetch current value of courseProgress
  const courseUserCredits = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable?.email, _createdBy));

  // Extract current value of courseProgress
  const courseCredits = courseUserCredits[0]?.credits;

  const result = await db
    .update(usersTable)
    .set({
      credits: courseCredits + 1,
    })
    .where(eq(usersTable?.email, _createdBy));

  return NextResponse.json(result);
}
