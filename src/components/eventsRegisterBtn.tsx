import { addEventAttendee } from '@/lib/getEvents';
import { checkIdExists } from '@/lib/tokenUtils';
import { Event } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { checkIdExists, eventAddAttendee } from './yourHelpers'; // Import your helper functions

interface EventRegistrationProps {
    id: string; // Pass the 'id' as a prop
    myEvents: Event[]; // Pass the 'myEvents' array as a prop
}

const EventRegistrationBtn: React.FC<EventRegistrationProps> = ({ id, myEvents }) => {
    const { data: session } = useSession();
    const [registered, setRegistered] = useState(false)

    useEffect(() => {
        setRegistered(checkIdExists(myEvents, id))
        console.log('running reg')
    }, [myEvents, id])
    

    const eventAddAttendee = async (id: string) => {
        try {
            await addEventAttendee(id);
            toast.success("Awesome! you are registered to attend this event", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRegistered(checkIdExists(myEvents, id))
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
    };

    return (
        <div className="max-w-xl my-4 mx-auto rounded-md">
            {!session && (
                <a className="p-3 bg-colorPrimary rounded-md text-white" href="/signin">
                    Login to attend event
                </a>
            )}
            {registered ? 
            <p>You have already registered for this event</p> : 
            <button
                className="p-3 bg-colorPrimary rounded-md text-white"
                onClick={() => eventAddAttendee(id)}
            >
            Attend Event
            </button>}
        </div>
    );
};

export default EventRegistrationBtn;
