import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import React from "react";

function CourseCard({ course }) {
  return (
    <div className="border rounded-md p-5 shadow-md">
      <div>
        <div className="flex justify-between items-center">
          <Image
            src={"/knowledge.png"}
            alt="konwledge"
            width={50}
            height={50}
          />
          <h2 className="text-[10px] p-1 px-2 rounded-full bg-primary text-white">
            2 feb 2025
          </h2>
        </div>
        <h2 className="mt-3 font-medium text-lg">
          {course?.courseLayout?.course_title}
        </h2>
        <p className="text-sm line-clamp-2 text-gray-500">
          {course?.courseLayout?.course_summary}
        </p>

        <div className="my-5">
          <Progress value={0} />
        </div>

        <div className="mt-3 flex justify-end">
          {course?.status == "Generating" ? (
            <h2 className="text-xs bg-gray-400 text-white flex justify-between rounded-full px-2 py-1 items-center">
              <RefreshCcw  className="h-3 w-3 mr-1"/> Generating...
            </h2>
          ) : (
            <Button>View</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
