import { drizzle } from "drizzle-orm/neon-http";
// import { config } from "dotenv";

export const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_CON_STRING);
