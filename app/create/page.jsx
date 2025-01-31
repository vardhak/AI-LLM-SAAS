"use client";
import { useState } from "react";
import SelectOption from "./_components/selectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/topicInput";

function CreatePage() {
  let btn = "";
  const [formData, setFormData] = useState([]);
  const handleUserInput = (fieldname, fieldvalue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldname]: fieldvalue,
    }));

    console.log(formData);
  };

  const [step, setStep] = useState(0);
  return (
    <div className=" flex flex-col items-center p-5 md:px-24 lg:px-32  mt-20 capitalize text-center">
      <h2 className="font-bold text-4xl text-primary">
        start building your personal study material
      </h2>
      <p className="text-gray-500 text-lg">
        fill all details in order to generate study material for your next
        project
      </p>

      <div className="mt-10">
        {step == 0 ? (
          <SelectOption
            selectedStudyType={(value) => {
              handleUserInput("studyType", value);
            }}
          />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            setDifLevel={(value) => handleUserInput("difLevel", value)}
          />
        )}
      </div>

      <div className="flex justify-between  w-full capitalize mt-10">
        {step != 0 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            previous
          </Button>
        ) : (
          <Button variant="outline" disabled>
            previous
          </Button>
        )}

        <Button onClick={() => setStep(step < 1 ? step + 1 : step + 0)}>
          {step == 1 ? (btn = "generate") : (btn = "next")}
        </Button>
      </div>
    </div>
  );
}

export default CreatePage;
