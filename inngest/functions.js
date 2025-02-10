import { db } from "@/configs/db";
import { inngest } from "./client";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_DATA_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  usersTable,
} from "@/configs/schema";
import {
  courseOutlineAiModel,
  GENERATE_QUIZ_AI_MODEL,
  GenerateFlashCards,
  notesGenAiModel3,
  notesGenAiModel4,
  notesGenAiModelFinal,
} from "@/configs/aiModel";
import { and, eq } from "drizzle-orm";
import { json } from "drizzle-orm/mysql-core";

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
        .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

      if (result?.length == 0) {
        // user not present
        const userRes = await db.insert(usersTable).values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        });
      }

      return "user verification done";
    });
    return "Success user athentication ";
  }
);

export const GenerateCourse = inngest.createFunction(
  { id: "AI_COURSE_GENERATOR" },
  { event: "CREATE_COURSE" },

  async ({ event, step }) => {
    const {
      _courseId,
      _topic,
      _courseType,
      _difficultyLevel,
      _createdBy,
      _date,
    } = event.data;

    const generateCourse = await step.run("Generate Course", async () => {
      // generate course layout using ai
      const PROMPT =
        "Generate the study material for " +
        _topic +
        " for " +
        _courseType +
        " and level of difficulty will be " +
        _difficultyLevel +
        " with summery of course, List of chapters along with summery and emoji icon for each chapter, topic list in list in chapter, all in JSON format.";
      const aiResponse = await courseOutlineAiModel.sendMessage(PROMPT);

      const aiResult = aiResponse.response.text();

      const cleanAiRes = aiResult.replace(/```json\n|\n```/g, "").trim();

      const parsedData = JSON.parse(cleanAiRes);

      //save the result along with user input
      const dbResult = await db
        .insert(STUDY_DATA_TABLE)
        .values({
          courseId: _courseId,
          topic: _topic,
          courseType: _courseType,
          createdBy: _createdBy,
          difficultyLevel: _difficultyLevel,
          courseLayout: parsedData,
        })
        .returning({ resp: STUDY_DATA_TABLE });

      return "generation complete";
    });

    const updateCourseCredits = await step.run(
      "Update Course Credits",
      async () => {
        // update course credits
        // Step 1: Fetch current value of courseProgress
        const courseUserCredits = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable?.email, _createdBy));

        // Extract current value of courseProgress
        const courseCredits = courseUserCredits[0]?.credits;

        const result = await db
          .update(usersTable)
          .set({
            credits: courseCredits + 1,
          })
          .where(eq(usersTable?.email, _createdBy));

        return "Course Credits Updated";
      }
    );

    return "AI_COURSE_GENERATOR SUCCEED !";
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course-notes" },
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

    const updateCourseProgress = await step.run("update Progress", async () => {
      // Step 1: Fetch current value of courseProgress
      const currentProgressResult = await db
        .select()
        .from(STUDY_DATA_TABLE)
        .where(eq(STUDY_DATA_TABLE.courseId, course?.courseId));

      // Extract current value of courseProgress
      const currentProgress = currentProgressResult[0]?.courseProgress;

      // Step 2: Increment the value and update
      const result = await db
        .update(STUDY_DATA_TABLE)
        .set({
          courseProgress: currentProgress + 1, // Increment currentProgress by 1
        })
        .where(eq(STUDY_DATA_TABLE.courseId, course?.courseId));

      return "Course progress updated successfully";
    });

    return "notes generated ";
  }
);

// theis inngest function is used to generate the study data for the course like flashcards,quize and qa

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "flash-cards" },
  { event: "gen.studyTypeContent" },

  async ({ event, step }) => {
    const { courseId, studyType, chapters } = event.data;

    if (studyType == "flashcard") {
      const FlashCardResult = await step.run(
        "generate flashcards",
        async () => {
          const PROMPT = `Generate the flashcard on topic :${chapters} in JSON format with front back content, maximum 15`;

          const aiResponse2 = GenerateFlashCards.sendMessage(PROMPT);

          const res = (await aiResponse2).response.text();
          const data = JSON.parse(res);

          return data;
        }
      );

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
            .where(
              and(
                eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
              )
            );

          return "Status Updated";
        }
      );

      const updateCourseProgress = await step.run(
        "update Progress",
        async () => {
          // Step 1: Fetch current value of courseProgress
          const currentProgressResult = await db
            .select()
            .from(STUDY_DATA_TABLE)
            .where(eq(STUDY_DATA_TABLE.courseId, courseId));

          // Extract current value of courseProgress
          const currentProgress = currentProgressResult[0]?.courseProgress;

          // Step 2: Increment the value and update
          const result = await db
            .update(STUDY_DATA_TABLE)
            .set({
              courseProgress: currentProgress + 1, // Increment currentProgress by 1
            })
            .where(eq(STUDY_DATA_TABLE.courseId, courseId));

          return "Course progress updated successfully";
        }
      );
    }

    // generate the quize if request is for quiz

    if (studyType == "quiz") {
      const QuizResult = await step.run("generate flashcards", async () => {
        const PROMPT = `Generate quiz on topic : ${chapters}  with question and options along with correct answer in JSON format minimum 10 questions`;
        const AiQuzieRes = GENERATE_QUIZ_AI_MODEL.sendMessage(PROMPT);

        const res = (await AiQuzieRes).response.text();
        const data = JSON.parse(res);

        return data;
      });

      const QuizDataSaved = await step.run("save quiz data to db", async () => {
        const dbResult = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
          courseId: courseId,
          content: QuizResult,
          type: studyType,
        });

        return "quiz data saved !";
      });

      const StatusUpdate = await step.run("update Quiz status", async () => {
        const res = await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            status: "READY",
          })
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
              eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
            )
          );

        return "Quiz Status Updated";
      });

      const updateCourseProgress = await step.run(
        "update Progress",
        async () => {
          // Step 1: Fetch current value of courseProgress
          const currentProgressResult = await db
            .select()
            .from(STUDY_DATA_TABLE)
            .where(eq(STUDY_DATA_TABLE.courseId, courseId));

          // Extract current value of courseProgress
          const currentProgress = currentProgressResult[0]?.courseProgress;

          // Step 2: Increment the value and update
          const result = await db
            .update(STUDY_DATA_TABLE)
            .set({
              courseProgress: currentProgress + 1, // Increment currentProgress by 1
            })
            .where(eq(STUDY_DATA_TABLE.courseId, courseId));

          return "Course progress updated successfully";
        }
      );
    }

    return "DONE";
  }
);
