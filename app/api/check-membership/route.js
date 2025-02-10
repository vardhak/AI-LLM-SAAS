import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();

  try {
    const isMember = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable?.email, email));

    return NextResponse.json({ member: isMember[0] });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
