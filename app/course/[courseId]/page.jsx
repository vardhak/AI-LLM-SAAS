"use client";
import DashboardHearder from "@/app/dashboard/_components/header";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntro from "./_components/CourseIntro";
import StudyMaterialList from "./_components/StudyMaterialList";
import ChapterList from "./_components/ChapterList";
import Header from "@/app/header/header";
import { Skeleton } from "@/components/ui/skeleton";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  const coursList = [
    {
      type: "Coding Prep",
      image: "/code.png",
    },
    {
      type: "Exam",
      image: "/exam.png",
    },
    {
      type: "Practice",
      image: "/practice.png",
    },
    {
      type: "Job Interview",
      image: "/job.png",
    },
    {
      type: "Other",
      image: "/knowledge.png",
    },
  ];

  const getImagePath = (courseType) => {
    // Find the matching course type and return its image
    const course = coursList.find((item) => item.type === courseType);
    return course ? course.image : "/knowledge.png"; // Default image in case the course type doesn't match
  };

  useEffect(() => {
    GetCourse();
  }, []);
  const GetCourse = async () => {
    try {
      const result = await axios.get("/api/courses?courseId=" + courseId);
      setCourse(result.data.course);
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Header />
      {course == null ? (
        <div className="grid grid-cols-2  gap-10 w-[85%] mx-auto mt-14">
          {[1, 2, 3, 4].map((item, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[180px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[180px]" />
                <Skeleton className="h-4 w-[170px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-10 md:mx-30 lg:mx-60 mt-10">
          {/* course intro */}
          <CourseIntro
            course={course}
            imgPath={getImagePath(course?.courseType)}
          />
          {/* study material opt */}
          <StudyMaterialList courseId={courseId} course={course} />
          {/* chapters list */}
          <ChapterList course={course} />
        </div>
      )}
    </div>
  );
}

export default Course;
