"use client";
import React, { useEffect, useState } from "react";
import DashboardHearder from "./_components/header";
import DashboardSlider from "./_components/slider";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

function DashboardLayout({ children }) {
  const path = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [credits, setCredits] = useState(0);
  const [acredits, setAcredits] = useState(5);

  useEffect(() => {
    user && getCredits();
  }, [user]);

  const getCredits = async () => {
    try {
      const res = await axios.post("/api/get-user-credits", {
        userEmail: user?.primaryEmailAddress.emailAddress,
      });

      setCredits(res.data[0]);
      setAcredits(res.data[0]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    acredits && (
      <div>
        <DashboardSlider
          Credits={credits.usedCredits}
          avCredits={acredits.avilableCredits}
        />

        <div className="md:ml-64">
          <DashboardHearder
            avCredits={acredits.avilableCredits}
            Credits={credits.usedCredits}
          />
          <div className="p-10">{children}</div>
        </div>
      </div>
    )
  );
}

export default DashboardLayout;
