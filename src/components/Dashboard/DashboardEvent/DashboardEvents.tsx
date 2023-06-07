import { useState, useEffect, useRef, useTransition, useCallback, useMemo } from 'react';
import { getPosts } from '@/lib/getPosts';
import 'suneditor/dist/css/suneditor.min.css';
// import UpdatePost from './UpdatePost';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Event } from '@prisma/client';
import { getEvents } from '@/lib/getEvents';
import UpdateEvent from './UpdateEvent';



const deleteEvent = async (id: string) => {
    const headersList = {
        "Accept": "*/*",
    };

    const reqOptions = {
        url: `/api/events?id=${id}`,
        method: "DELETE",
        headers: headersList,
    };

    try {
        const response = await axios.request(reqOptions);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const DashboardEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [updateEvent, setUpdateEvent] = useState(false);
    const eventUpdateRef = useRef<HTMLDivElement | null>(null);

    const [startTransition, isPending] = useTransition();

    const toggleUpdateEvent = useCallback(() => {
        setUpdateEvent(prevState => !prevState);
    }, []);

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const memoizedSelectedEvent = useMemo(() => selectedEvent, [selectedEvent]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await getEvents();
                setEvents(fetchedEvents);
            } catch (error) {
                const notify = () => toast.error("unable to get evebts! check your internet", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                notify();
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        const event = events.find(evt => evt.id === id);
        setSelectedEvent(event!);
        try {
            await deleteEvent(event?.id!);
            const notify = () => toast.success("Event successfully Deleted!");
            notify();
        } catch (error) {
            const notify = () => toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            notify();
        }
    }, [events]);

    const handleUpdate = useCallback((id: string) => {
        const event = events.find(evt => evt.id === id);
        if (event?.title) {
            setSelectedEvent(event);
            toggleUpdateEvent();
        }
    }, [events, toggleUpdateEvent]);

    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            {(!events.length) && <div>No events!</div>}
            <table className="w-full">
                <thead className='p-4 m-4 bg-slate-300 rounded-xl border'>
                    <tr>
                        <th>Title</th>
                        <th>details</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map((event) => (
                        <tr className='p-4 m-4' key={event.id}>
                            <UpdateEvent isOpen={updateEvent}
                                onClose={toggleUpdateEvent}
                                //@ts-ignore
                                event={memoizedSelectedEvent}
                                //@ts-ignore
                                eventUpdateRoot={eventUpdateRef} />
                            <td>{event.title}</td>
                            <td> <div dangerouslySetInnerHTML={{ __html: event.details }} /></td>
                            <td>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(event.id!)}
                                        className="text-red-500  px-4 py-2 mr-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        id={event.id}
                                        onClick={() => handleUpdate(event.id!)}
                                        className="text-blue-500 px-4 py-2 rounded-md"
                                    >
                                        Update
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