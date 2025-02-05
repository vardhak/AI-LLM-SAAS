import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { studyType, courseId, chapters } = await req.json();

  const { ids } = await inngest.send({
    name: "gen.studyTypeContent",
    data: {
      courseId: courseId,
      studyType: studyType,
      chapters: chapters,
    },
  });

  return NextResponse.json(ids[0]);
}
