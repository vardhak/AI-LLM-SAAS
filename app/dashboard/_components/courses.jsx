"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./courseCard";

function Courses() {
  const { user } = useUser();

  // initial we set courseData empty
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    user && getCourseData();
  }, [user]);

  async function getCourseData() {
    const result = await axios.post("api/courses", {
      createdBy: user?.primaryEmailAddress.emailAddress,
    });
    console.log(result);

    setCourseData(result.data.result);
  }

  return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl">Your Study Material</h2>

      <div className="grid sm:grid-cols-2 md grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {courseData?.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Courses;
