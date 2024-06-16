"use client";
import "react-toastify/ReactToastify.min.css";
import GetUserProvider from "@/components/context/UserContent";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "../redux/slices/authSlice";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch the checkAuth action to verify if the user is authenticated
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to the sign-in page if the user is unauthenticated
    if (auth.status === "failed" && !auth.user) {
      router.push("/auth/signin");
    }
  }, [auth.status, auth.user, router]);

  return (
    <div>
      <GetUserProvider>
        <div className="mt-10 pt-10 max-w-screen-2xl md:mx-auto border-b border-gray-300">
          <div className="bg-[#EDF6EF] dark:bg-black rounded-xl p-4 m-4">
            {children}
          </div>
        </div>
      </GetUserProvider>
    </div>
  );
}
