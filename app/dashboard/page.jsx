import React from "react";
import WelcomeBanner from "./_components/welcomeBanner";
import Courses from "./_components/courses";

function Dashboard() {
  return (
    <div>
      <WelcomeBanner />
      <Courses />
    </div>
  );
}

export default Dashboard;
