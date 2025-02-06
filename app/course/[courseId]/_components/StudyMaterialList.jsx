import React, { useEffect, useState } from "react";
import MaterialCard from "./MaterialCard";
import axios from "axios";
import { resolve } from "styled-jsx/css";

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
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "ALL",
    });

    setStudyMaterial(result.data);
    console.log("updated !!!! :)");
    setLoad(true);
  };

  return (
    load && (
      <div className="mt-5">
        <h2 className="capitalize font-medium text-xl">Study Material</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
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
    )
  );
}

export default StudyMaterialList;
