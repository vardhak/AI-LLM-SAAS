import React from "react";
import ReactCardFlip from "react-card-flip";

function FlashCardItem({ isFlipped, handleClick, items }) {
  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          onClick={handleClick}
          className="p-4 flex text-center text-lg justify-center items-center shadow-2xl rounded-lg cursor-pointer md:h-[350px] md:w-[300px] h-[250px] w-[200px] bg-primary text-white"
        >
          <h2>{items?.front}</h2>
        </div>

        <div
          onClick={handleClick}
          className="p-4 flex text-center text-lg justify-center items-center shadow-2xl rounded-lg cursor-pointer md:h-[350px] md:w-[300px] h-[250px] w-[200px] bg-black text-white"
        >
          <h2>{items?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlashCardItem;
