import { UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function DashboardHearder() {
  return (
    <div className="px-5 py-4 flex md:justify-end justify-between shadow-md sticky top-0 bg-white z-10">
      <MenuIcon className="md:hidden cursor-pointer" />
      <UserButton />
    </div>
  );
}

export default DashboardHearder;
