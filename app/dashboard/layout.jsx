import React from "react";
import DashboardHearder from "./_components/header";
import DashboardSlider from "./_components/slider";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block fixed">
        <DashboardSlider />
      </div>

      <div className="md:ml-64">
        <DashboardHearder />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
