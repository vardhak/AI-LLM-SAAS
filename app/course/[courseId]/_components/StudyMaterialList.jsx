import React from "react";
import MaterialCard from "./MaterialCard";

function StudyMaterialList() {
  const materialList = [
    {
      name: "Notes/Chapters",
      discription: "Read Notes To Be Well Prepaired",
      icon: "/notes.png",
      path: "/notes",
    },
    {
      name: "Flashcard",
      discription: "Flashcard Help To Remember Concept",
      icon: "/flashcard.png",
      path: "/flashcards",
    },
    {
      name: "Quiz",
      discription: "Great Way To Test Your Knowledge",
      icon: "/quiz.png",
      path: "/quiz",
    },
    {
      name: "Question/Answer",
      discription: "Help To Practice Your Learning",
      icon: "/qa.png",
      path: "/qa",
    },
  ];

  return (
    <div className="mt-5">
      <h2 className="capitalize font-medium text-xl">Study Material</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
        {materialList.map((item, index) => (
          <MaterialCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialList;
