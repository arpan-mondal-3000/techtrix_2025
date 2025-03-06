// Library import
import { Outlet } from "react-router";
import { NavElements } from "@/lib";

// Icons import
import { RiHome2Line } from "react-icons/ri";
import { FaUsersGear } from "react-icons/fa6";

import Sidebar from "@/components/Sidebar";

function Dashboard() {
  const navElements: NavElements[] = [
    {
      displayName: "Dashboard",
      linkTo: "/dashboard/",
      logo: <RiHome2Line />,
    },
    {
      displayName: "Driver Management",
      linkTo: "/dashboard/driver-manager",
      logo: <FaUsersGear />,
    },
  ];
  return (
    <>
      <div className="flex bg-muted min-h-screen">
        <div>
          <Sidebar navElements={navElements} />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
