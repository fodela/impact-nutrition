// "use client";
// import { Overview } from "./admin/Overview";
// import React, { useContext, useEffect, useState } from "react";
// import GetPaymentProvider, {
//   GetPaymentContext,
// } from "../context/PaymentContext";
// import GetAttendeeProvider, {
//   GetAttendeesContext,
// } from "../context/AttendeeContext";
// import { CiCalendar } from "react-icons/ci";
// // import { LuLayoutPanelLeft, LuUsers2 } from "react-icons/lu";
// import DashboardTable from "./DashboardTable";
// import { GetEventContext } from "../context/EventContext";

// import Pagination from "./DashboardTable/Pagination";
// import EventTableRow from "./DashboardEvent/EventTableRow";
// import TableHeader from "./DashboardTable/TableHeader";
// import { BiLeftArrow, BiMessageRoundedDetail, BiSearch, BiUser } from "react-icons/bi";
// import PostsDashboardView from "./DashboardTable/PostDashboardView";

// const eventTableHeadings = [
//   "#",
//   "Name",
//   "Organizers",
//   "Date Created",
//   "Date and Time",
//   "attendees",
//   "Price",
//   "Venue",
//   "Actions",
// ];

// const AdminDash = () => {
//   const [dashboarTab, setDashboardTab] = useState("overview");

//   const { payments, totalPayments, getAllPayments } =
//     useContext(GetPaymentContext);
//   const { events, getAllEvents } = useContext(GetEventContext);
//   const { attendees, getAllattendees } = useContext(GetAttendeesContext);
//   useEffect(() => {
//     getAllPayments();
//     getAllEvents();
//     getAllattendees();
//     return () => {};
//   }, []);

//   let dashboardTabView;
//   switch (dashboarTab) {
//     case "events":
//       dashboardTabView = (
//         <>
//           <h2 className="heading_tertiary">Events</h2>
//           <div className="flex justify-between">
//             <div className="bg-white px-2 dark:bg-white/10 shadow-lg flex rounded-lg  items-center">
//               <input
//                 type="search"
//                 className="p-3 rounded-full bg-transparent"
//                 placeholder="Search post"
//               />
//               <BiSearch size={25} className="opacity-30" />
//             </div>
//             <button className="btn_primary flex gap-1 items-center">
//               Add Post <CiCalendar size={25} />
//             </button>
//           </div>
//           <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 divide-y-2">
//             <table className="w-full border-collapse  text-left text-sm">
//               <TableHeader headings={eventTableHeadings} />
//               {/* <TableHeader /> */}
//               <tbody className="divide-y divide-gray-100 border-t border-gray-100">
//                 {events.map((event, index) => (
//                   <EventTableRow key={index} idx={index} eventDetail={event} />
//                 ))}
//               </tbody>
//             </table>
//             <Pagination />
//           </div>
//         </>
//       );
//       break;
//     case "posts":
//       dashboardTabView = <PostsDashboardView />;
//       break;
//     case "users":
//       dashboardTabView = <DashboardTable />;
//       break;
//     default:
//       dashboardTabView = <Overview />;
//       break;
//   }

//   return (
//     <div className="py-10  dark:bg-inherit">
//       <nav className="bg-white rounded-xl py-4 mb-8 w-fit dark:bg-white/10">
//         <ul className="flex gap-8 px-4  justify-start text-[#b7b7b7]">
//           <li>
//             <button
//               className={`px-2 lg:px-4 flex gap-2 items-center ${
//                 dashboarTab === "overview"
//                   ? "border-b-2 text-black dark:text-white dark:border-white border-black font-bold"
//                   : ""
//               }`}
//               onClick={() => setDashboardTab("overview")}
//             >
//               {/* <LuLayoutPanelLeft size={25} />  */}
//              <BiLeftArrow /> Dashboard
//             </button>
//           </li>
//           <li>
//             <button
//               className={`px-2 lg:px-4  flex gap-2 items-center ${
//                 dashboarTab === `posts`
//                   ? "border-b-2 text-black dark:text-white dark:border-white border-black font-bold"
//                   : ""
//               }`}
//               onClick={() => setDashboardTab("posts")}
//             >
//               <BiMessageRoundedDetail size={25} /> Posts
//             </button>
//           </li>
//           <button
//             className={`px-2 lg:px-4  flex gap-2 items-center ${
//               dashboarTab === `users`
//                 ? "border-b-2 text-black dark:text-white dark:border-white border-black font-bold"
//                 : ""
//             }`}
//             onClick={() => setDashboardTab("users")}
//           >
//             {/* <LuUsers2 size={25} />  */}
//             <BiUser /> Users
//           </button>
//           <li>
//             <button
//               className={`px-2 lg:px-4 flex gap-2 items-center   ${
//                 dashboarTab === `events`
//                   ? "border-b-2 text-black font-bold dark:text-white dark:border-white border-black"
//                   : ""
//               }`}
//               onClick={() => setDashboardTab("events")}
//             >
//               <CiCalendar size={25} /> Events
//             </button>
//           </li>
//         </ul>
//       </nav>
//       <GetPaymentProvider>
//         <GetAttendeeProvider>{dashboardTabView}</GetAttendeeProvider>
//       </GetPaymentProvider>
//     </div>
//   );
// };

// export default AdminDash;
