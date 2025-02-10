import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="px-5 py-2 flex justify-between items-center shadow-md sticky top-0 bg-white z-10">
      <div className="flex justify-center items-center gap-2">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-extrabold">EasyStudy</h1>
      </div>
      <div className="flex justify-center items-center gap-x-2">
        <UserButton />
        <Link href={"/dashboard"}>
          <Button>Dashborad</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
