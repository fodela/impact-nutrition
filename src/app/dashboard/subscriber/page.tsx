'use client'
import Pagination from "@/components/Dashboard/DashboardTable/Pagination";
import TableHeader from "@/components/Dashboard/DashboardTable/TableHeader";
import { GetAttendeesContext } from "@/components/context/AttendeeContext";
import { GetEventContext } from "@/components/context/EventContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
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


const Subscriber = () => {
    const { myEvents, getAllMyEvents } = useContext(GetEventContext);
    const {data: session} = useSession()
    console.log(myEvents, 'myevents')
    useEffect(() => {
        if(session){
            console.log(session,'session')
            !myEvents.length && session.user &&  getAllMyEvents(session.user.id)
        }
        // !myEvents && getAllMyEvents();
        return () => { };
    }, [session]);

    return <div className="flexx">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md my-5 divide-y-2 bg-gray-50 dark:bg-white/10">
            {myEvents.length === 0 && <div>No events!</div>}

            <table className="w-full">
                <thead className="p-4 m-4 text-dark bg-slate-300 rounded-xl border">
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myEvents.map(event => (
                        <tr className="p-4 m-4" key={event.id}>
                           
                            <td>{event.title}</td>
                            <td>
                                <div dangerouslySetInnerHTML={{ __html: event.details }} />
                            </td>
                            <td>
                                <div className="flex justify-end">
                                    <Link className="" href={`/dashboard/admin/events/${event.id}`} legacyBehavior>
                                        <a className=" font-bold"><BsFillEyeFill size={25} /> </a>
                                    </Link>

                                    {/* <button
                                        onClick={() => handleDelete(event.id!)}
                                        className="text-red-500  px-4 py-2 mr-2 rounded-md"
                                    >
                                        <BsTrash3 size={25} />
                                    </button> */}
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />

        </div>
    </div>
};

export default Subscriber;
