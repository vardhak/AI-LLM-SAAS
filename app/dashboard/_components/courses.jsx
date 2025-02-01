"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./courseCard";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

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
      <h2 className="font-bold text-3xl flex justify-between items-center">
        Your Study Material
        <Button variant="outline" className="border-primary text-primary w-20 h-10">
          <RefreshCcw /> Refresh
        </Button>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {courseData?.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Courses;
