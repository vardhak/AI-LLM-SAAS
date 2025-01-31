import { serial, pgTable, varchar, boolean ,json} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  ismember: boolean().default(false),
});

export const STUDY_DATA_TABLE = pgTable("studyData", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default("Easy"),
  courseLayout: json(),
  createdBy: varchar().notNull(),
});
