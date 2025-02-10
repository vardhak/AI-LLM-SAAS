import { UserButton } from "@clerk/nextjs";
import { ArrowRightIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DashboardSlider from "./slider";
import CousreStatus from "./cousreStatus";

function DashboardHearder({ avCredits, Credits }) {
  const router = useRouter(); // Use the Next.js router
  const [activeButton, setActiveButton] = useState(null); // Track the active button for styling

  // Function to handle navigation and button highlight
  const handleNavigation = (route, buttonId) => {
    setActiveButton(buttonId); // Set the active button for styling
    router.push(route); // Navigate to the specified route
  };

  return (
    <>
      <div className="px-5 py-4 flex md:justify-end justify-between shadow-md sticky top-0 bg-white z-10">
        <div className="md:hidden block">
          <DropdownMenu className="mx-3 ml-5 overflow-scroll">
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer outline-none" // Add cursor-pointer and outline-none here
              >
                <MenuIcon className="cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Radio Item 1 */}
              <DropdownMenuRadioItem
                value="statusBar"
                onClick={() => handleNavigation("/dashboard", "courses")}
                className={`cursor-pointer m-2 hover:bg-slate-100 p-2 ${
                  activeButton === "courses" ? "bg-primary text-white" : ""
                } outline-none`} // Apply cursor-pointer and remove outline
              >
                Courses
              </DropdownMenuRadioItem>
              {/* Radio Item 1 */}
              <DropdownMenuRadioItem
                value="statusBar"
                onClick={() =>
                  handleNavigation("/dashboard/upgradePlan", "upgrade")
                }
                className={`cursor-pointer m-2 hover:bg-slate-100 p-2 ${
                  activeButton === "upgrade" ? "bg-primary text-white" : ""
                } outline-none`} // Apply cursor-pointer and remove outline
              >
                Upgrade
              </DropdownMenuRadioItem>

              {/* Radio Item 2 (disabled) */}
              <DropdownMenuRadioItem
                value="activityBar"
                onClick={() =>
                  handleNavigation("/dashboard/Profile", "profile")
                }
                className={`cursor-pointer m-2 hover:bg-slate-100 p-2 ${
                  activeButton === "profile" ? "bg-primary text-white" : ""
                } outline-none`} // Apply cursor-pointer and remove outline
              >
                Profile
              </DropdownMenuRadioItem>

              {/* Radio Item 3 */}
              <DropdownMenuRadioItem
                value="panel"
                onClick={() => handleNavigation("/", "home")}
                className={`cursor-pointer m-2 hover:bg-slate-100 p-2 ${
                  activeButton === "home" ? "bg-primary text-white" : ""
                } outline-none`} // Apply cursor-pointer and remove outline
              >
                Home
              </DropdownMenuRadioItem>

              {/* Radio Item 3 */}
              <DropdownMenuRadioItem
                value="panel"
                onClick={() => handleNavigation("/create", "create")}
                className={`mt-4 p-2 outline-none`} // Apply cursor-pointer and remove outline
              >
                <Button>
                  <ArrowRightIcon /> Create Course
                </Button>
              </DropdownMenuRadioItem>

              <div className="w-full flex justify-center items-center py-2">
                <CousreStatus Credits={Credits} avCredits={avCredits} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UserButton />
      </div>
    </>
  );
}

export default DashboardHearder;
