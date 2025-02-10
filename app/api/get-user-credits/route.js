import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userEmail } = await req.json();

  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
