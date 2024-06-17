import { userSession } from '@/app/api/auth/checkAuth/route';
import { addEventAttendee } from '@/lib/getEvents';
import { checkIdExists } from '@/lib/tokenUtils';
import { Event } from '@prisma/client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface EventRegistrationProps {
    id: string; // Pass the 'id' as a prop
    myEvents: Event[]; // Pass the 'myEvents' array as a prop
    session: userSession | null;
}

const EventRegistrationBtn: React.FC<EventRegistrationProps> = ({ id, myEvents, session }) => {
    const [registered, setRegistered] = useState(false);

    const eventAddAttendee = useCallback(async (eventId: string) => {
        try {
            await addEventAttendee(eventId);
            toast.success("Awesome! you are registered to attend this event", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRegistered(true);
        } catch (error) {
            //@ts-ignore
            const errorMessage = error?.response?.data?.message || "We were unable to add you to the event!";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }, []);

    useEffect(() => {
        setRegistered(checkIdExists(myEvents, id));
    }, [myEvents, id]);

    return (
        <div className="max-w-xl my-4 mx-auto rounded-md">
            {!session && (
                <a className="bg-gray-500  py-3 px-6 rounded text-white hover:bg-gray-700 " href="/auth/signin">
                    Login to attend event
                </a>
            )}
            {registered && <p>You have already registered for this event</p>}
            {session && !registered && (
                <button
                    className="bg-gray-500  py-3 rounded text-white hover:bg-gray-700 px-6 font-semibold"
                    onClick={() => eventAddAttendee(id)}
                >
                    Attend Event
                </button>
            )}
        </div>
    );
};

export default EventRegistrationBtn;
