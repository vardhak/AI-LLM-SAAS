import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Loader,
  Loader2,
  LoaderCircle,
  LoaderPinwheel,
  LucideLoader,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseCard({ course, value, img1 }) {
  return (
    <div className="border rounded-md p-5 shadow-md">
      <div>
        <div className="flex justify-between items-center">
          <Image src={img1} alt="konwledge" width={50} height={50} />
          <h2 className="text-[10px] p-1 px-2 rounded-full bg-primary text-white">
            {course?.date}
          </h2>
        </div>

        <div className=" h-[165px] flex justify-between flex-col">
          <h2 className="mt-3 font-medium text-lg line-clamp-2">
            {course?.courseLayout?.courseTitle}
          </h2>
          <p className="text-sm line-clamp-2 text-gray-500">
            {course?.courseLayout?.courseSummary}
          </p>

          <div className="my-5 w-full">
            <Progress value={value} />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Link href={"/course/" + course?.courseId}>
            <Button>View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
