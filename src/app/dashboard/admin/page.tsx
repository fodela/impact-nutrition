'use client'
import Pagination from "@/components/Dashboard/DashboardTable/Pagination";
import TableHeader from "@/components/Dashboard/DashboardTable/TableHeader";
import { GetAttendeesContext } from "@/components/context/AttendeeContext";
import { useContext, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaPencilAlt, FaUser } from "react-icons/fa";


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


const Admin = () => {
  // const { attendees, getAllattendees } = useContext(GetAttendeesContext);

  // useEffect(() => {
  //   !attendees.length && getAllattendees();
  //   return () => { };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // !attendees.length && getAllattendees();
  return <div className="flexx">
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md my-5 divide-y-2 bg-gray-50 dark:bg-white/10">
      <table className="w-full border-collapse  text-left text-sm my">
        <TableHeader headings={headings} />
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {/* {attendees.map((att, index) => (
            <tr
              key={index}
              className={`hover:bg-inherit/80 ${att.paid && "bg-green-50 dark:bg-green-900/10"
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
                      <BiTrashAlt size={20} />
                    </a>
                    <a x-data="{ tooltip: 'Edit' }" href="#">
                      <FaPencilAlt size={20} />
                    </a>
                  </>
                </div>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
      <Pagination />
    </div>
  </div>
};

export default Admin;
