"use client";
import DashboardHearder from "@/app/dashboard/_components/header";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntro from "./_components/CourseIntro";
import StudyMaterialList from "./_components/StudyMaterialList";
import ChapterList from "./_components/ChapterList";
import Header from "@/app/header/header";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    GetCourse();
  }, []);
  const GetCourse = async () => {
    const result = await axios.get("/api/courses?courseId=" + courseId);

    setCourse(result.data.course);
    console.log(result.data);
  };
  return (
    <div>
      <Header />
      <div className="mx-10 md:mx-30 lg:mx-60 mt-10">
        {/* course intro */}
        <CourseIntro course={course} />
        {/* study material opt */}
        <StudyMaterialList courseId={courseId} course={course} />
        {/* chapters list */}
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default Course;
