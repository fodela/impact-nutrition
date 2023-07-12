import { useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'
import { GetEventContext } from '../context/EventContext'
import { useParams } from 'next/navigation';
import { getEventById, getMyEvents } from '@/lib/getEvents';
import TableHeader from './DashboardTable/TableHeader';
import Image from 'next/image';
import { Event } from '@prisma/client';

const SubscriberDash = () => {
    const headings = ["Event Image", "Title", "Details", "Location", "Price"];
    const { data: session, status } = useSession();
    const [event, setEvent] = useState<Event | null>(null);
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const getAllMyEvents = async (id: string) => {
            try {
                const allMyEvents = await getMyEvents(id);
                setMyEvents(allMyEvents);
            } catch (error) {
                console.log("myeventserr", error);
            }
        };
        //@ts-ignore
        let id = session?.user.id

        if (id) {
            getAllMyEvents(id);
        }

        return () => {
            // Cleanup function to cancel any pending requests or subscriptions
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md divide-y-2 bg-gray-50 dark:bg-white/10">
            <h1 className='m-4'> Your Events</h1>
            <table className="w-full border-collapse  text-left text-sm my">
                <TableHeader headings={headings} />
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {
                        myEvents.map((evnt, index) => (
                            <>
                                <tr className={`hover:bg-inherit/80`}>
                                    <th className="flex gap-3 px-6 py-4 font-normal">
                                        <div className="relative h-10 w-10">
                                            <Image alt='event image' width={50} height={50} key={evnt.id} src={
                                                //@ts-ignore
                                                evnt.image.toString()} className="h-full w-full rounded-full object-cover object-center" />
                                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{evnt.title}</td>

                                    <td className="px-6 py-4">  {evnt.details && <div dangerouslySetInnerHTML={{ __html: evnt.details }} />}</td>
                                    <td className="px-6 py-4">{evnt.location}</td>
                                    <td className="px-6 py-4">{evnt.price}</td>
                                    <a href={`/events/${evnt.id}`} className='bg-green-500 text-white py-2 rounded-md px-4 m-2'>More</a>
                                </tr>

                            </>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SubscriberDash