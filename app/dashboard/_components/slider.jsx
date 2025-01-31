"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { index } from "drizzle-orm/mysql-core";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function DashboardSlider() {
  const path = usePathname();
  const menuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="h-screen shadow-md flex flex-col items-center">
      <div className="w-full flex justify-center items-center mt-2 gap-2">
        <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
        <h1 className="text-2xl  font-extrabold">EasyStudy</h1>
      </div>

      <div className="mx-auto w-[80%] mt-10">
        <Link href={"/create"} className="w-full">
          <Button className="w-full">+ create new</Button>
        </Link>

        <div className="mt-5">
          {menuList.map((item, index) => (
            <div
              key={index}
              className={`flex gap-2 items-center hover:bg-slate-200 rounded-xl p-3 cursor-pointer mt-3
              ${path == item.path && "bg-slate-200"}`}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-slate-100 border rounded-lg  w-[95%] absolute bottom-10">
        <h2 className="text-lg mb-2">available credites : 5</h2>
        <Progress value={40} />
        <h2 className="text-sm">2 out of 5 credites used</h2>

        <Link href={"dashboard/upgrade"} className="text-xs text-primary mt-3">
          upgrade for more
        </Link>
      </div>
    </div>
  );
}

export default DashboardSlider;
