"use client";
import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function FlashcardPage() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState(false);

  useEffect(() => {
    getStudyMaterial();
  }, []);

  async function getStudyMaterial() {
    try {
      const result = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(
          and(
            eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
            eq(STUDY_TYPE_CONTENT_TABLE.type, "flashcard")
          )
        );
      console.log(result[0].content);
      setFlashcards(result[0].content);
    } catch (er) {
      console.error(er);
    }
  }

  return (
    flashcards && (
      <div>
        Flashcard :{" "}
        {flashcards?.map((item, index) => (
          <div key={index} className="p-4 m-5 shadow-sm bg-slate-300">
            <h1>FRONT : {item.front}</h1>
            <h1>BACK : {item.back}</h1>
            <hr />
            <hr />
          </div>
        ))}
      </div>
    )
  );
}

export default FlashcardPage;
