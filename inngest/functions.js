import { db } from "@/configs/db";
import { inngest } from "./client";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_DATA_TABLE,
  usersTable,
} from "@/configs/schema";
import { notesGenAiModel } from "@/configs/aiModel";
import { eq } from "drizzle-orm";

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

    //Generate notes for each chapter with ai

    const notesResult = await step.run("Generate chapter notes", async () => {
      const Chapters = course?.courseLayout?.chapters;
      let index = 0;

      Chapters.forEach(async (chapter) => {
        const PROMPT = `Generate exam material detail content for each chapter, Make sure to include all topic point in the content, make sure to give content in HTML format, do not add (HTML,HEAD,BODY TITLE tag) the chapters : ${JSON.stringify(
          chapter
        )}`;

        const result = await notesGenAiModel.sendMessage(PROMPT);

        const aiResponse = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResponse,
        });

        index = index + 1;
      });
      return "completed";
    });

    // update course status

    const updateCourseStatus = await step.run(
      "update status to ready",
      async () => {
        const result = await db
          .update(STUDY_DATA_TABLE)
          .set({
            status: "Ready",
          })
          .where(eq(STUDY_DATA_TABLE.courseId, course?.courseId));

        return "success";
      }
    );
  }
);
