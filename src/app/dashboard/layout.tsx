"use client";
import "react-toastify/ReactToastify.min.css";
import GetUserProvider from "@/components/context/UserContent";
import { useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();


if (status === "unauthenticated") {
      redirect("/auth/signin");
}
  return (
    <div>
      <GetUserProvider>
      <div className="mt-10 pt-10 max-w-screen-2xl md:mx-auto border-b border-gray-300 ">
        <div className="bg-[#EDF6EF] dark:bg-black rounded-xl p-4 m-4">
          {children}
        </div>
      </div> 
      </GetUserProvider>
    </div>
  );
}
