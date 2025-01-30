import { serial, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  ismember: boolean().default(false),
});
