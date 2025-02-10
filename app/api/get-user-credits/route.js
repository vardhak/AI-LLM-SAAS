import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userEmail } = await req.json();

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, userEmail));

  return NextResponse.json(result);
}
