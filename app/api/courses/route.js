import { db } from "@/configs/db";
import { STUDY_DATA_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { createdBy } = await req.json();

  const result = await db
    .select()
    .from(STUDY_DATA_TABLE)
    .where(eq(createdBy, STUDY_DATA_TABLE.createdBy));

  return NextResponse.json({ result: result });
}
