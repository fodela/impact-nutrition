'use client';
import { useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { BsFillEyeFill } from 'react-icons/bs';
import { GetEventContext } from '@/components/context/EventContext';
import Pagination from '@/components/Dashboard/DashboardTable/Pagination';

const headings = ["#", "Title", "Details", "Location", "Price", "actions"];
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
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            //@ts-ignore
            !myEvents.length && session.user && getAllMyEvents(session.user.id);
        }
    }, []);
    console.log(myEvents, 'myEvents')
    return (
        <div className="subscription-container">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md my-5 divide-y-2 bg-gray-50 dark:bg-white/10">
                {myEvents?.length === 0 && <div>No events!</div>}

                <table className="w-full">
                    <thead>
                        <tr className='p-4 m-4 rounded-xl border'>
                            {headings.map((heading, index) => (
                                <th className='px-2' key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {myEvents?.map(({ id, title, details, location, price }, index) => (
                            <tr className="p-4 m-4"  key={id}>
                                <td className='p-4'>{index}</td>
                                <td className='p-4'>{title}</td>
                                <td className='p-4'>
                                    <div dangerouslySetInnerHTML={{ __html: details }} />
                                </td>
                                <td className='p-4'>{location}</td>
                                <td className='p-4'>{price}</td>
                                <td className='p-4'>
                                    <div className="flex justify-end">
                                        <Link href={`/events/${id}`} legacyBehavior>
                                            <a className="font-bold underline">
                                                Open
                                            </a>
                                        </Link>
                                    </div>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination />
            </div>
        </div>
    );
};

export default Subscriber;