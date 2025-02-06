import { db } from "@/configs/db";
import { inngest } from "./client";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_DATA_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  usersTable,
} from "@/configs/schema";
import {
  GenerateFlashCards,
  notesGenAiModel3,
  notesGenAiModel4,
  notesGenAiModelFinal,
} from "@/configs/aiModel";
import { eq } from "drizzle-orm";
import { json } from "drizzle-orm/mysql-core";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const checkIsNewUser = inngest.createFunction(
  { id: "user-auth" },
  { event: "create-new-user" },
  async ({ event, step }) => {
    // get event data

    const { user } = event.data;
    step.run("check user and create new if not exist", async () => {
      // check if user exits

      const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user?.primaryEmailAddress.emailAddress));

      console.log(user);

      if (result.length == 0) {
        // user not present
        const userRes = await db
          .insert(usersTable)
          .values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
          })
          .returning({ id: usersTable.id });

        console.log(userRes);
      }
      return "hel";
    });
    return "Success";
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;
    let notesRes;

    //Generate notes for each chapter with ai
    const notesResult = await step.run("Generate chapter notes", async () => {
      const Chapters = course?.courseLayout?.chapters;
      let index = 0;

      // Create an array of promises instead of using forEach
      const chapterPromises = Chapters.map(async (chapter, index) => {
        const PROMPT4 = `generate exam material detail content for each chapter, Make sure to include all topic point in the content, Make sure to give content in HTML format (do not add HTMLK, Head, Body, Title tag), provide it well styled more like a chatgpt like well structured output use tables or lists and any components to make it so astetic make titles bigger then subtitles slightly smaller and  make use of all red green blue yellow colors for text bold fonts and also try to make boxeses ofdifferent colors having lighter shadows which will be more beautifull just make sure that it must look the great html you can also provide examples or formulas or tables if required and  make sure to make all of it complete responsive on any device like mobile or tab or large screen and make sure provide a more in detail and more humanized information dont add any images the Chapters:${JSON.stringify(
          chapter
        )}make the chapter title bigger its not working and return output as plain/text of HTML Code make sure the code is clean and work in browser use same key for all and do not add any extra column or key`;

        const result = await notesGenAiModel4.sendMessage(PROMPT4);
        const aiResponse = result.response.text();

        // Insert into the database
        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: { data: aiResponse },
        });

        index = index + 1;
      });

      // Wait for all the promises to resolve
      await Promise.all(chapterPromises);

      return "notes saved to database";
    });

    const fetchRecords = await step.run("fetch records", async () => {
      const notesRes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, course?.courseId));

      return notesRes;
    });

    const updateCourseStatus = await step.run(
      "update status to ready",
      async () => {
        const result = await db
          .update(STUDY_DATA_TABLE)
          .set({
            status: "Ready",
          })
          .where(eq(STUDY_DATA_TABLE.courseId, course?.courseId));

        return "status updated successfully";
      }
    );

    return fetchRecords;
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "flash-cards" },
  { event: "gen.studyTypeContent" },

  async ({ event, step }) => {
    const { courseId, studyType, chapters } = event.data;

    const FlashCardResult = await step.run("generate flashcards", async () => {
      const PROMPT = `Generate the flashcard on topic :${chapters} in JSON format with front back content, maximum 15`;

      const aiResponse2 = GenerateFlashCards.sendMessage(PROMPT);

      const res = (await aiResponse2).response.text();
      const data = JSON.parse(res);

      return data;
    });

    const svaeFlashcardToDb = await step.run(
      "svae flashcards to db",
      async () => {
        const dbResult = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
          courseId: courseId,
          content: FlashCardResult,
          type: studyType,
        });

        return "flashcards saved to database !!";
      }
    );

    const updateStatus = await step.run(
      "update flashcards status",
      async () => {
        const res = await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            status: "READY",
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

        return "Status Updated";
      }
    );
    return "DONE";
  }
);
