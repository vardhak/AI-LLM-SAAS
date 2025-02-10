"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function WelcomeBanner() {
  const { user } = useUser();
  return (
    user && (
      <div className="p-5 bg-primary w-full text-white rounded-lg flex items-center gap-6 md:flex-row flex-col">
        <Image src={"/laptop.png"} alt="laptop" width={100} height={100} />

        <div>
          <h2 className="font-bold text-3xl capitalize">
            hello, {user?.fullName}
          </h2>
          <p className="">
            welcome back, it's time to get back and start learning new course
          </p>
        </div>
      </div>
    )
  );
}

export default WelcomeBanner;
