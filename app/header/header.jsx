import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="px-5 py-2 flex justify-between shadow-md sticky top-0 bg-white z-10">
      <div className="flex justify-center items-center gap-2">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-extrabold">EasyStudy</h1>
      </div>
      <UserButton />
    </div>
  );
}

export default Header;
