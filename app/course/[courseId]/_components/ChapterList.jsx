import React from "react";

function ChapterList({ course }) {
  const CHAPTERS = course?.courseLayout?.chapters;

  return (
    <div className="mt-5">
      <h2 className="capitalize font-medium text-xl">Chapters</h2>

      <div className="my-7">
        {CHAPTERS?.map((chapter, key) => (
          <div
            key={key}
            className="flex gap-7 items-center p-4 border shadow-md mb-2 rounded-lg cursor-pointer hover:bg-slate-100"
          >
            <h2 className="text-2xl">{chapter?.emoji}</h2>
            <div>
              <h2 className="font-medium">{chapter.chapterTitle}</h2>
              <p className="text-gray-500 text-sm line-clamp-2">{chapter.chapterSummary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
