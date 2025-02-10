"use client";
import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashCardItem from "./flashCardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from "@/app/header/header";

function FlashcardPage() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState(false);
  const [isFlipped, setIsFliped] = useState();
  Carousel;
  const [api, setApi] = useState();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setIsFliped(false);
    });
  }, [api]);

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

  const handleClick = () => {
    setIsFliped(!isFlipped);
  };

  return (
    <>
      <Header />

      {flashcards != false ? (
        <div className="mt-12 md:mt-6">
          <div className="flex justify-center items-center flex-col w-[85%] mx-auto text-center">
            <h2 className="text-4xl font-bold uppercase">flashcards</h2>
            <p className="text-sm text-slate-600 capitalize my-2 max-md:mt-4 max-md:text-lg">
              flashcards : an ultimate tool for learning and retaining concepts{" "}
            </p>
          </div>

          <Carousel setApi={setApi} className="w-[77%] mx-auto mt-4">
            <CarouselContent>
              {flashcards?.map((item, index) => (
                <CarouselItem
                  className="flex justify-center items-center flex-col pb-4"
                  key={index}
                >
                  <FlashCardItem
                    handleClick={handleClick}
                    isFlipped={isFlipped}
                    items={item}
                  />
                  <h1 className="text-lg  mt-2">{index + 1}</h1>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div></div>
        </div>
      ) : null}
    </>
  );
}

export default FlashcardPage;
