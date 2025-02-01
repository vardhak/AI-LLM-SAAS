import { courseOutlineAiModel } from "@/configs/aiModel";
import { db } from "@/configs/db";
import { STUDY_DATA_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { _courseId, _topic, _courseType, _difficultyLevel, _createdBy } =
    await req.json();

  // generate course layout using ai
  const PROMPT =
    "Generate the study material for " +
    _topic +
    " for " +
    _courseType +
    " and level of difficulty will be " +
    _difficultyLevel +
    " with summery of course, List of chapters along with summery for each chapter, topic list in list in chapter, all in JSON format.";
  const aiResponse = await courseOutlineAiModel.sendMessage(PROMPT);

  const aiResult = aiResponse.response.text();

  const cleanAiRes = aiResult.replace(/```json\n|\n```/g,"").trim();

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
    .returning({ STUDY_DATA_TABLE });

  console.log(dbResult);
  return NextResponse.json({ result: dbResult[0] });
}
