import {
  serial,
  pgTable,
  varchar,
  boolean,
  json,
  integer,
} from "drizzle-orm/pg-core";

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
  difficultyLevel: varchar().default("Simple"),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default("Generating"),
});

export const CHAPTER_NOTES_TABLE = pgTable("chapterNotes", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  notes: json(),
});

export const STUDY_TYPE_CONTENT_TABLE = pgTable("studyTypeContent", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  content: json(),
  type: varchar().notNull(),
  status: varchar().default("GENERATING"),
});
