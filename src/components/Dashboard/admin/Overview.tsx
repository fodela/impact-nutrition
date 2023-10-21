import { UpcomingEventCard } from "./UpcomingEventCard";
import React, { useContext, useEffect } from "react";
import DashboardCard from "../DashboardContent/DashboardCard";
import TableHeader from "../DashboardTable/TableHeader";
import Pagination from "../DashboardTable/Pagination";
import { GetPaymentContext } from "@/components/context/PaymentContext";
import { GetEventContext } from "@/components/context/EventContext";
import { GetAttendeesContext } from "@/components/context/AttendeeContext";
import { FaUser } from "react-icons/fa";
import { BiCalendarCheck, BiUser } from "react-icons/bi";
// import { PiCalendarCheck } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
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

export function Overview() {
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
  return (
    <>
      <div className="flex gap-8 justify-center">
        <DashboardCard detail={summaries[0]}>
          <BiUser className="text-white" size={32} />
        </DashboardCard>
        <DashboardCard detail={summaries[1]}>
          <BiCalendarCheck className="text-white" size={32} />
        </DashboardCard>
        <DashboardCard detail={summaries[2]}>
          <GiTakeMyMoney className="text-white" size={32} />
        </DashboardCard>
        <div className="flex flex-col text-stone-500 gap-4">
          <p className="text-sm">November 2023</p>
          <p className="text-black dark:text-white ">Upcoming Events</p>

          {events.map((event, index) => (
            <UpcomingEventCard key={index} event={event} />
          ))}
        </div>
      </div>
      {/* <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 divide-y-2 bg-gray-50 dark:bg-white/10">
        <table className="w-full border-collapse  text-left text-sm my">
          <TableHeader headings={headings} />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {attendees.map((att, index) => (
              <>
                <tr
                  className={`hover:bg-inherit/80 ${
                    att.paid && "bg-green-50 dark:bg-green-900/10"
                  }`}
                >
                  <th className="flex gap-3 px-6 py-4 font-normal">
                    <div className="relative h-10 w-10">
                      <FaUser className="h-full w-full rounded-full object-cover object-center" />
                      <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">
                        {
                          //@ts-ignore
                          att.user.name
                        }
                      </div>
                      <div className="text-gray-400">
                        {
                          //@ts-ignore
                          att.user.email
                        }
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {
                      //@ts-ignore
                      att.event.title
                    }
                  </td>

                  <td>
                    {att.paid ? (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-600 px-2 py-1 text-xs font-semibold text-green-600 dark:text-green-50 capitalize"
                      >
                        paid
                      </span>
                    ) : (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900 px-2 py-1 text-xs font-semibold text-amber-900 dark:text-amber-50 capitalize"
                      >
                        Not paid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 capitalize">{att.amount_paid}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">{att.amount_due}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <>
                        <a x-data="{ tooltip: 'Delete' }" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </a>
                        <a x-data="{ tooltip: 'Edite' }" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </a>
                      </>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div> */}
    </>
  );
}
