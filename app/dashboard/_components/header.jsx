import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function DashboardHearder() {
  return (
    <div className="px-5 py-4 flex justify-end shadow-md sticky top-0 bg-white z-10">
      <UserButton />
    </div>
  );
}

export default DashboardHearder;
