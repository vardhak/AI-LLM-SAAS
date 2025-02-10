import { inngest } from "@/inngest/client";
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

  try {
    const result = await inngest.send({
      event: "CREATE_COURSE",
      data: {
        _courseId: _courseId,
        _topic: _topic,
        _courseType: _courseType,
        _difficultyLevel: _difficultyLevel,
        _createdBy: _createdBy,
        _date: _date,
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
