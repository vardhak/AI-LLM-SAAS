"use client"
import { Button } from "@/components/ui/button";
import { index } from "drizzle-orm/mysql-core";
import { CornerRightDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

function QuizCard({ quize, data, resetAnswerState }) {
  const [displayWrite, setDisplayWrite] = useState("hidden");
  const [displayWrong, setDisplayWrong] = useState("hidden");

  useEffect(() => {
    // Reset the states whenever resetAnswerState is triggered
    if (resetAnswerState) {
      setDisplayWrite("hidden");
      setDisplayWrong("hidden");
    }
  }, [resetAnswerState]);

  const checkAnswer = (userAnswer) => {
    const correctAnswer = data.answer;
    if (correctAnswer === userAnswer) {
      setDisplayWrong("hidden");
      setDisplayWrite("block");
      console.log("correct");
    } else {
      setDisplayWrite("hidden");
      setDisplayWrong("block");
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold capitalize text-center mt-6">
          {data.question}
        </h2>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-6 mt-10  align-middle justify-center max-w-[680px] mx-auto">
          {data.options?.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className={`px-9 py-6 rounded-lg text-wrap hover:bg-primary hover:text-white transition ease-in-out duration-150`}
              onClick={() => {
                checkAnswer(item);
              }}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="flex justify-center items-center text-center mt-10">
          <h1
            className={`${displayWrite} p-3 capitalize bg-green-100 font-bold rounded-lg text-wrap border text-green-400 transition ease-in-out duration-150`}
          >
            correct answer
          </h1>
          <h1
            className={`${displayWrong} p-3 capitalize bg-red-100 font-bold rounded-lg text-wrap border text-red-400 transition ease-in-out duration-150`}
          >
            wrong answer, correct one : {data.answer}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
