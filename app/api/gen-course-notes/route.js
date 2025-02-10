import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { data } = await req.json();

  try {
    const NotesResult = await inngest.send({
      name: "notes.generate",
      data: {
        course: data,
      },
    });

    return NextResponse.json([{ NotesResult: NotesResult }]);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
