"use client";
import DashboardCard from "@/components/Dashboard/DashboardContent/DashboardCard";
import { UpcomingEventCard } from "@/components/Dashboard/admin/UpcomingEventCard";
import GetAttendeeProvider from "@/components/context/AttendeeContext";
import { GetEventContext } from "@/components/context/EventContext";
import GetPaymentProvider from "@/components/context/PaymentContext";
import { useContext, useEffect } from "react";
import { BiCalendarCheck, BiUser } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getEvents } from "@/app/redux/actions/eventsAction";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/app/redux/slices/authSlice";

const headings = ["#", "Name", "Date Created", "Role", "Status", "actions"];
const summaries = [
  {
    label: "users",
    quantity: "22.54k",
    color: "bg-purple-500",
  },
  {
    label: "events",
    quantity: "305",
    color: "bg-cyan-500",
  },
  {
    label: "revenue",
    quantity: "22.5k",
    color: "bg-sky-500",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { events, error } = useAppSelector((state) => state.events);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch the checkAuth action to verify if the user is authenticated
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to the subscriber dashboard if the user is authenticated but not an administrator
    if (auth.status === "succeeded" && auth.user?.role !== "ADMINISTRATOR") {
      router.push("/dashboard/subscriber");
    }
    // Redirect to the sign-in page if the user is unauthenticated
    if (auth.status === "failed" && !auth.user) {
      router.push("/auth/signin");
    }
  }, [auth.status, auth.user, router]);

  useEffect(() => {
    if (!events?.length && auth.user?.role === "ADMINISTRATOR") {
      dispatch(getEvents());
    }
  }, [events?.length, dispatch, auth.user?.role]);

  return (
    <>
      <div className="flex gap-8 justify-center">
        <div className="w-3/4">
          <div className="flex lg:gap-8">
            <DashboardCard detail={summaries[0]}>
              <BiUser className="text-white" size={32} />
            </DashboardCard>
            <DashboardCard detail={summaries[1]}>
              <BiCalendarCheck className="text-white" size={32} />
            </DashboardCard>
            <DashboardCard detail={summaries[2]}>
              <GiTakeMyMoney className="text-white" size={32} />
            </DashboardCard>
          </div>
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
    </>
  );
}
