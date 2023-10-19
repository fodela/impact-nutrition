"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { verifyUserRole } from "@/lib/verifyUserRole";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuUsers2 } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { LuLayoutPanelLeft } from "react-icons/lu";

const DashboardNav = () => {
  const [tabs] = useState(["Dashboard", "Posts", "Events"]);

  const pathname = usePathname();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated" && !session) {
    redirect("/api/auth/signin");
  }

  if (!session) {
    redirect("/api/auth/signin");
  }
  //@ts-ignore
  const role = session.user.role;
  return (
    <nav className="bg-white rounded-xl py-4 mb-8 w-fit dark:bg-white/10">
      <ul className="flex gap-8 px-4  justify-start text-[#b7b7b7]">
        <li>
          <Link
            className={`px-2 lg:px-4 flex gap-2 items-center ${
              pathname === `/dashboard`
                ? "border-b-2 text-black dark:text-white dark:border-white border-black font-bold"
                : ""
            }`}
            href={"/dashboard"}
          >
            <LuLayoutPanelLeft size={25} /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={`px-2 lg:px-4  flex gap-2 items-center ${
              pathname === `/users`
                ? "border-b-2 text-black dark:text-white dark:border-white border-black font-bold"
                : ""
            }`}
            href={"dashboard/users"}
          >
            <LuUsers2 size={25} /> Users
          </Link>
        </li>
        <li>
          <Link
            className={`px-2 lg:px-4 flex gap-2 items-center   ${
              pathname === `/events`
                ? "border-b-2 text-black dark:text-white dark:border-white border-black"
                : ""
            }`}
            href={"dashboard/events"}
          >
            <CiCalendar size={25} /> Events
          </Link>
        </li>
        {/* {tabs.map((tab) => {
          if (verifyUserRole(role, tab)) {
            return (
              <li key={tab}>
                <Link
                  className={`px-2 lg:px-4 font-bold ${
                    pathname === `/dashboard/${tab.toLocaleLowerCase()}`
                      ? "border-b-2 dark:border-white border-black"
                      : ""
                  }`}
                  href={`/dashboard/${tab.toLowerCase()}`}
                >
                  <div className="flex gap-2 items-center">
                    <AiFillDashboard /> {tab}
                  </div>
                </Link>
              </li>
            );
          }
        })} */}
      </ul>
    </nav>
  );
};

export default DashboardNav;
