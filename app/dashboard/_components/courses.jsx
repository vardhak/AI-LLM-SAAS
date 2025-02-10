"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./courseCard";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

function Courses() {
  const { user } = useUser();

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

  useEffect(() => {
    user && getCourseData();
  }, [user]);

  // initial we set courseData empty
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImagePath = (courseType) => {
    // Find the matching course type and return its image
    const course = coursList.find((item) => item.type === courseType);
    return course ? course.image : "/knowledge.png"; // Default image in case the course type doesn't match
  };

  async function getCourseData() {
    setLoading(true);
    const result = await axios.post("api/courses", {
      createdBy: user?.primaryEmailAddress.emailAddress,
    });
    console.log(result.data.result);

    setCourseData(result.data.result);
    // setCourseProgress(result.data.)
    setLoading(false);
  }

  return (
    <div className="mt-10">
      <RefreshCcw
        onClick={getCourseData}
        className="fixed bottom-3 right-3 h-5 w-5 text-primary cursor-pointer"
      />

      <h2 className="font-bold text-3xl flex justify-between items-center mb-5">
        Your Study Material
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5 bg-fixed">
        {loading == false
          ? courseData?.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                img1={getImagePath(courseData[index].courseType)}
                value={courseData[index].courseProgress * 25}
              />
            ))
          : [1, 2, 3, 4, 5, 6].map((key, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Courses;
