"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { index } from "drizzle-orm/mysql-core";
import { HomeIcon, LayoutDashboard, Shield, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CousreStatus from "./cousreStatus";

function DashboardSlider({ avCredits, Credits }) {
  const path = usePathname();
  const router = useRouter();

  const menuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgradePlan",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/Profile",
    },
    {
      name: "Home",
      icon: HomeIcon,
      path: "/",
    },
  ];
  const [stop, setStop] = useState(false);

  useEffect(() => {
    if (Credits >= avCredits) {
      setStop(true);
    }
  },[Credits]);

  return (
    <div
      className={`shadow-md bg-white hidden md:flex flex-col items-center fixed w-[255px] h-screen`}
    >
      <div className="w-full flex justify-center items-center mt-2 gap-2">
        <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
        <h1 className="text-2xl  font-extrabold">EasyStudy</h1>
      </div>

      <div className="mx-auto w-[80%] mt-10">
        <Button
          className="w-full"
          disabled={stop}
          onClick={() => {
            router.push("/create");
          }}
        >
          + create new
        </Button>

        <div className="mt-5">
          {menuList.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                className={`flex gap-2 items-center hover:bg-slate-200 rounded-xl p-3 cursor-pointer mt-3
                ${path == item.path && "bg-slate-200"}`}
              >
                <item.icon />
                <h2>{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CousreStatus avCredits={avCredits} Credits={Credits} className="" />
    </div>
  );
}

export default DashboardSlider;
