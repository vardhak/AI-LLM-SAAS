"use client";
import DashboardHearder from "@/app/dashboard/_components/header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { date } from "drizzle-orm/mysql-core";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewPage() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState(false);
  const [stepCount, setStepCount] = useState(1);
  const route = useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "notes",
    });

    setNotes(result.data);
  };
  console.log(notes);

  return (
    <div>
      <DashboardHearder />

      {notes && (
        <div>
          <div className="flex gap-5 items-center w-[65%] mx-auto mt-10">
            {stepCount == 1 ? null : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setStepCount(stepCount - 1);
                }}
              >
                previous
              </Button>
            )}
            {notes?.map((item, index) => (
              <div
                key={index}
                className={`w-full rounded-full h-2
${index < stepCount ? "bg-primary" : "bg-gray-200"}`}
              ></div>
            ))}

            {stepCount == notes?.length + 1 ? null : (
              <Button
                size="sm"
                className="bg-primary"
                onClick={() => {
                  setStepCount(stepCount + 1);
                }}
              >
                next
              </Button>
            )}
          </div>
          <div className="w-[85%] mx-auto mt-16">
            {stepCount <= notes?.length ? (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: (notes[stepCount - 1].notes?.data).replace(
                    "```html",
                    ""
                  ),
                }}
              />
            ) : (
              <div className="flex justify-center items-center flex-col">
                <h1 className="text-4xl font-bold text mb-6 mt-16">
                  Chapter Completed !
                </h1>

                <Button
                  size="sm"
                  onClick={() => {
                    route.back();
                  }}
                >
                  Go Back To Course
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPage;
