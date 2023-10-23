import { ToastContainer } from "react-toastify";

import "react-toastify/ReactToastify.min.css";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import DashboardNav from "./DashboardNav";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('running home layout')
  return (
    <div>
      <div className="mt-10 pt-10 max-w-screen-2xl md:mx-auto border-b border-gray-300 ">
        <ToastContainer />
        <div className="bg-[#EDF6EF] dark:bg-black rounded-xl p-4 m-4">
          <DashboardNav />
          {children}
        </div>
      </div>
    </div>
  );
}
