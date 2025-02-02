import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function MaterialCard({ item, studyTypeContent }) {
  return (
    <div
      className={`flex shadow-md rounded-lg p-5 flex-col items-center ${
        studyTypeContent?.[item.type]?.length == null && "grayscale"
      }`}
    >
      {studyTypeContent?.[item.type]?.length == null ? (
        <h2 className="px-2 bg-gray-500 rounded-full text-[10px] p-1 mb-2 text-white">
          Pending
        </h2>
      ) : (
        <h2 className="px-2 bg-green-500 rounded-full text-[10px] p-1 mb-2 text-white">
          Ready
        </h2>
      )}

      <Image src={item.icon} alt="item" width={50} height={50} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.discription}</p>

      {studyTypeContent?.[item.type]?.length == null ? (
        <Button className="mt-3 w-full" variant="outline">
          Generate
        </Button>
      ) : (
        <Button className="mt-3 w-full" variant="outline">
          View
        </Button>
      )}
    </div>
  );
}

export default MaterialCard;
