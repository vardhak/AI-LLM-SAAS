import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

function CourseIntro({ course, imgPath }) {
  return (
    <>
      {course == null ? null : (
        <div className="flex gap-5 items-center p-5 shadow-md rounded-lg flex-col md:flex-row border">
          <Image src={imgPath} alt="know" width={70} height={70} />

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-3xl">
              {course?.courseLayout?.courseTitle}
            </h2>
            <p className="line-clamp-3">
              {course?.courseLayout?.courseSummary}
            </p>
            {/* <Progress value={30} /> */}

            <h2 className="mt-3 text-lg text-primary">
              Total Chapters : {course?.courseLayout?.chapters.length}
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseIntro;
