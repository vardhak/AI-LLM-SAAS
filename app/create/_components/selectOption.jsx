import Image from "next/image";
import React, { useState } from "react";

function SelectOption({ selectedStudyType }) {
  const options = [
    {
      name: "Exam",
      icon: "/exam.png",
    },
    {
      name: "Job Interview",
      icon: "/job.png",
    },
    {
      name: "Practice",
      icon: "/practice.png",
    },
    {
      name: "Coding Prep",
      icon: "/code.png",
    },
    {
      name: "Other",
      icon: "/knowledge.png",
    },
  ];

  const [selectedOp, setselectedOp] = useState();

  return (
    <div>
      <h2 className="capitalize text-center mb-2 text-lg">
        for which you want to create your personal study material
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              setselectedOp(option.name);
              selectedStudyType(option.name);
            }}
            className={`p-4 flex flex-col items-center justify-center border rounded-md gap-2 cursor-pointer hover:bg-slate-50 hover:border-primary
              ${option.name == selectedOp && "bg-slate-50 border-primary"}`}
          >
            <Image src={option.icon} alt={option.name} width={50} height={50} />
            <h2 className="text-sm">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectOption;
