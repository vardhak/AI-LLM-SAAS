"use client";
import Header from "@/app/header/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuizCard from "./_components/QuizCard";

function QuizPage() {
  const [isDataReady, setIsDataReady] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { courseId } = useParams();
  const [resetAnswerState, setResetAnswerState] = useState(false);

  useEffect(() => {
    getQuizData();
  }, []);

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setResetAnswerState(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setResetAnswerState(true);
    }
  };

  useEffect(() => {
    if (resetAnswerState) {
      setResetAnswerState(false); // Reset after one render cycle
    }
  }, [resetAnswerState]);

  const getQuizData = async () => {
    // this function is created to fecth the quiz data whenever the page is loaded

    try {
      const responseData = await axios.post("/api/get-quiz-data", {
        courseId: courseId,
        studyType: "quiz",
      });

      setQuizData(await responseData.data.res[0].content);
      setIsDataReady(true);
      console.log(quizData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header />
      {isDataReady == false ? (
        <div className="grid grid-cols-2  gap-10 w-[85%] mx-auto mt-14">
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
        <div>
          <div className="flex justify-center items-center w-[80%] mx-auto mt-8">
            <QuizCard
              quize={currentIndex}
              data={quizData[currentIndex]}
              resetAnswerState={resetAnswerState}
            />
          </div>

          <div className="flex justify-center items-center w-[90%] mx-auto mt-6 mb-10">
            <Button
              variant={"outline"}
              size="sm"
              onClick={handlePrevious}
              className={`${currentIndex === 0 ? "hidden" : "block"}`}
            >
              Previous
            </Button>

            {quizData?.map((item, index) => (
              <div
                key={index}
                className={`w-full h-2 rounded-full mx-2 ${
                  index <= currentIndex ? "bg-primary" : "bg-slate-300"
                }`}
              ></div>
            ))}

            <Button
              size="sm"
              onClick={handleNext}
              className={`${
                currentIndex === quizData.length - 1 ? "hidden" : "block"
              }`}
            >
              Next
            </Button>

            {/* display quiz cards */}
          </div>
        </div>
      )}
    </>
  );
}

export default QuizPage;
