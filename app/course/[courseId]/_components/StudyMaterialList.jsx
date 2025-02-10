import React, { useEffect, useState } from "react";
import MaterialCard from "./MaterialCard";
import axios from "axios";
import { resolve } from "styled-jsx/css";
import { Toast } from "@radix-ui/react-toast";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

function StudyMaterialList({ courseId, course }) {
  const materialList = [
    {
      name: "Notes/Chapters",
      discription: "Read Notes To Be Well Prepaired",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      discription: "Flashcard Help To Remember Concept",
      icon: "/flashcard.png",
      path: "/flashcards",
      type: "flashcard",
    },
    {
      name: "Quiz",
      discription: "Great Way To Test Your Knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "quiz",
    },
    {
      name: "Question/Answer",
      discription: "Help To Practice Your Learning",
      icon: "/qa.png",
      path: "/qa",
      type: "qa",
    },
  ];

  const [studyMaterial, setStudyMaterial] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getStudyMaterial();
  }, []);

  const getStudyMaterial = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "ALL",
      });

      setStudyMaterial(result.data);
      console.log("updated !!!! :)");
      setLoad(true);
    } catch (e) {
      console.error(e);
      toast({
        title: "Course Status",
        description:
          "The system is currently processing your request. Please hold on while the data loads.",
      });
    }
  };

  return (
    <>
      {load == false ? (
        <div className="grid md:grid-cols-4 grid-cols-1 mt-5 gap-10 ">
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
        <div className="mt-5">
          <h2 className="capitalize font-medium text-xl max-md:text-3xl max-md:flex max-md:justify-center max-md:items-center max-md:my-8">Study Material</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-sm:gap-y-8 mt-5">
            {materialList?.map((item, index) => (
              <MaterialCard
                key={index}
                item={item}
                studyTypeContent={studyMaterial}
                courseId={courseId}
                chapters={course?.courseLayout?.chapters}
                course={course}
                reFreshCard={getStudyMaterial}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default StudyMaterialList;
