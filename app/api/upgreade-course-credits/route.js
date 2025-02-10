import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { _email, _credits } = await req.json();

  try {
    const { res } = await inngest.send({
      name: "update.UserCredits",
      data: {
        email: _email,
        credits: _credits,
      },
    });

    return NextResponse.json({ result: res });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
