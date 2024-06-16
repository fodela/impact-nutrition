"use client";
import { UpcomingEventCard } from "@/components/Dashboard/admin/UpcomingEventCard";
import GetAttendeeProvider from "@/components/context/AttendeeContext";
import { GetEventContext } from "@/components/context/EventContext";
import GetPaymentProvider from "@/components/context/PaymentContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { checkAuth } from "@/app/redux/slices/authSlice";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { events, getAllEvents } = useContext(GetEventContext);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch the checkAuth action to verify if the user is authenticated
    dispatch(checkAuth());
  }, [dispatch]);

  // useEffect(() => {
  //   // Redirect to the admin dashboard if the user is authenticated but not a subscriber
  //   if (auth.status === "succeeded" && auth.user?.role !== "SUBSCRIBER") {
  //     router.push("/dashboard/admin");
  //   }
  //   // Redirect to the sign-in page if the user is unauthenticated
  //   if (auth.status === "failed" || !auth.user) {
  //     router.push("/auth/signin");
  //   }
  // }, [auth.status, auth.user, router]);

  useEffect(() => {
    !events.length && getAllEvents();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-8 justify-center">
      <div className="w-3/4">
        <GetPaymentProvider>
          <GetAttendeeProvider>{children}</GetAttendeeProvider>
        </GetPaymentProvider>
      </div>
      <div className="flex flex-col text-stone-500 gap-4 w-1/4">
        <p className="text-sm">November 2023</p>
        <p className="text-black dark:text-white">Upcoming Events</p>

        {events.map((event, index) => (
          <UpcomingEventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}
