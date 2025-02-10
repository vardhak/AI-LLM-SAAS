"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { index } from "drizzle-orm/mysql-core";
import { HomeIcon, LayoutDashboard, Shield, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function DashboardSlider() {
  const path = usePathname();
  const { user } = useUser();
  const [credits, setCredits] = useState(0);
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
      path: "/dashboard/profile",
    },
    {
      name: "Home",
      icon: HomeIcon,
      path: "/",
    },
  ];

  useEffect(() => {
    user && getCredits();
  }, [user]);

  const getCredits = async () => {
    try {
      const res = await axios.post("/api/get-user-credits", {
        userEmail: user?.primaryEmailAddress.emailAddress,
      });

      setCredits(res.data[0]);
      // console.log(res.data[0].credits);
    } catch (e) {
      console.error(e);
    }
  };
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

      <div className="p-3 bg-slate-100 border rounded-lg  w-[95%] absolute bottom-10">
        <h2 className="text-lg mb-2">available credites : 5</h2>
        <Progress value={(credits.credits / 5) * 100} />
        <h2 className="text-sm">{credits.credits} out of 5 credites used</h2>

        <Link href={"dashboard/upgrade"} className="text-xs text-primary mt-3">
          upgrade for more
        </Link>
      </div>
    </div>
  );
}

export default DashboardSlider;
