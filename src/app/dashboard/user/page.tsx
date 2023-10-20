"use client";

import Pagination from "@/components/Dashboard/DashboardTable/Pagination";
import TableHeader from "@/components/Dashboard/DashboardTable/TableHeader";
import { UpcomingEventCard } from "@/components/Dashboard/admin/UpcomingEventCard";
import EventTableRow from "@/components/Dashboard/user/EventTableRow";
import GetAttendeeProvider, {
  GetAttendeesContext,
} from "@/components/context/AttendeeContext";
import { GetEventContext } from "@/components/context/EventContext";
import GetPaymentProvider, {
  GetPaymentContext,
} from "@/components/context/PaymentContext";
import { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { LuLayoutPanelLeft, LuUser2 } from "react-icons/lu";

const eventTableHeadings = [
  "#",
  "Name",
  "Organizers",
  "Date Created",
  "Date and Time",
  "attendees",
  "Price",
  "Venue",
];

const AdminDash = () => {
  const [dashboarTab, setDashboardTab] = useState("overview");

  const { payments, totalPayments, getAllPayments } =
    useContext(GetPaymentContext);
  const { events, getAllEvents } = useContext(GetEventContext);
  const { attendees, getAllattendees } = useContext(GetAttendeesContext);
  useEffect(() => {
    getAllPayments();
    getAllEvents();
    getAllattendees();
    return () => {};
  }, []);

  let dashboardTabView;
  switch (dashboarTab) {
    case "profile":
      dashboardTabView = (
        <>
          profile
          <h2 className="heading_secondary">Coming soon!</h2>
        </>
      );
      break;

    default:
      dashboardTabView = (
        <>
          <h2 className="heading_tertiary">Registered Events</h2>
          <div className="flex justify-between">
            <div className="bg-white px-2  dark:bg-white/10 shadow-lg flex rounded-lg  items-center">
              <input
                type="search"
                className="p-3 rounded-full bg-transparent outline-none"
                placeholder="Search post"
              />
              <BiSearch size={25} className="opacity-30" />
            </div>
          </div>

          <div className="flex gap-8 justify-center">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 divide-y-2">
              <table className="w-full border-collapse  text-left text-sm">
                <TableHeader headings={eventTableHeadings} />
                {/* <TableHeader /> */}
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {events.map((event, index) => (
                    <EventTableRow
                      key={index}
                      idx={index}
                      eventDetail={event}
                    />
                  ))}
                </tbody>
              </table>
              <Pagination />
            </div>

            <div className="flex flex-col text-stone-500 gap-4">
              <p className="text-sm">November 2023</p>
              <p className="text-black dark:text-white ">Upcoming Events</p>

              {events.map((event, index) => (
                <UpcomingEventCard key={index} event={event} />
              ))}
            </div>
          </div>
        </>
      );
      break;
  }

  return (
    <div className="py-10  dark:bg-inherit">
      <nav className="bg-white rounded-xl py-4 mb-8 w-fit dark:bg-white/10">
        <ul className="flex gap-8 px-4  justify-start text-[#b7b7b7]">
          <li>
            <button
              className={`px-2 lg:px-4 flex gap-2 items-center ${
                dashboarTab === "overview"
                  ? "border-b-2 text-black dark:text-white dark:border-white border-black font-bold"
                  : ""
              }`}
              onClick={() => setDashboardTab("overview")}
            >
              <LuLayoutPanelLeft size={25} /> Overview
            </button>
          </li>
          <li>
            <button
              className={`px-2 lg:px-4  flex gap-2 items-center ${
                dashboarTab === `profile`
                  ? "border-b-2 text-black dark:text-white dark:border-white border-black font-bold"
                  : ""
              }`}
              onClick={() => setDashboardTab("profile")}
            >
              <LuUser2 size={25} /> Profile
            </button>
          </li>
        </ul>
      </nav>
      <GetPaymentProvider>
        <GetAttendeeProvider>{dashboardTabView}</GetAttendeeProvider>
      </GetPaymentProvider>
    </div>
  );
};

export default AdminDash;
