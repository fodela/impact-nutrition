"use client";
import "react-toastify/ReactToastify.min.css";
import GetUserProvider from "@/components/context/UserContent";
import { useAppSelector } from "../redux/hooks";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentSession, sessionStatus } = useAppSelector(state => state.session)
 

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      window.location.href = "/signin";
    }
  }, [sessionStatus]);

  if (currentSession) {
    const currentPath = window.location.href;
    const newPath =
      //@ts-ignore
      currentSession.user.role === "SUBSCRIBER" && currentPath.includes("admin")
        ? currentPath.replace("/admin", "/subscriber")
        : //@ts-ignore
        currentSession.user.role === "ADMIN" && currentPath.includes("subscriber")
        ? currentPath.replace("/subscriber", "/admin")
        : currentPath;

    if (currentPath !== newPath) {
      window.location.href = newPath;
    }
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
