/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect, useRef, useCallback, useMemo, useContext } from 'react';
import 'suneditor/dist/css/suneditor.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Event } from '@prisma/client';
import { deleteEvent } from '@/lib/getEvents';
import { GetEventContext } from '@/components/context/EventContext';
import Link from 'next/link';
import { BsFillEyeFill, BsTrash3 } from 'react-icons/bs';
import { TbPencil } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { getEvents } from '@/app/redux/actions/eventsAction';


const DashboardEvents = () => {
    const { events, error } = useAppSelector(state => state.events)
    const dispatch = useAppDispatch()
    useEffect(() => {
        !events?.length && dispatch(getEvents());
        return () => { };
    }, []);


    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const memoizedSelectedEvent = useMemo(() => selectedEvent, [selectedEvent]);

    const handleDelete = useCallback(async (id: string) => {
        const event = events.find(evt => evt.id === id);
        setSelectedEvent(event!);
        try {
            await deleteEvent(event?.id!);
            const notify = () => toast.success('Event successfully deleted!');
            notify();
        } catch (error) {
            const notify = () =>
                toast.error('Something went wrong!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            notify();
        }
    }, [events]);


    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            <ToastContainer />
            <div className="relative mb-2 flex justify-end">
                <a href="/dashboard/admin/events/addevent" className='p-3 rounded-lg bg-colorPrimary'> Add event</a>
            </div>
            {events.length === 0 && <div>No events!</div>}
            <table className="w-full">
                <thead className="p-4 m-4 text-dark bg-slate-300 rounded-xl border">
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr className="p-4 m-4" key={event.id}>
                            <td>{event.title}</td>
                            <td>
                                <div dangerouslySetInnerHTML={{ __html: event?.excerpt || "<p>Update and add an excerpt</p>" }} />
                            </td>
                            <td>
                                <div className="flex justify-end">
                                    <Link className="" href={`/dashboard/admin/events/${event.id}`} legacyBehavior>
                                        <a className=" font-bold"><BsFillEyeFill size={25}/> </a>
                                    </Link>
                                  
                                    <a
                                    href={`/dashboard/admin/events/updateevent/${event.id}`}
                                        id={event.id}
                                        className="text-blue-500 px-4 py-2 rounded-md"
                                    >
                                        <TbPencil size={25} />
                                    </a>  
                                    <button
                                        onClick={() => handleDelete(event.id!)}
                                        className="text-red-500  px-4 py-2 mr-2 rounded-md"
                                    >
                                        <BsTrash3 size={25} />
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardEvents;
