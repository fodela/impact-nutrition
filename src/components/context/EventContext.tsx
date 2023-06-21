'use client'
import { createContext, useState } from "react";
import { ChildrenProps } from "../NextAuthProvider";
import { Event } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { getEvents } from "@/lib/getEvents";

export interface GetEventContextType {
    events: Event[];
    getAllEvents: () => void;
}

export const GetEventContext = createContext<GetEventContextType>({
    events: [],
    getAllEvents: () => { },
});




const GetEventsProvider = ({ children }: ChildrenProps) => {
    const [events, setEvents] = useState<Event[]>([]);

    const getAllEvents = async () => {
        try {
            const events: Event[] = await getEvents();
            setEvents(events);
        } catch (error) {
            toast.error("Unable to get events. check your internet", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    };


    return (
        <GetEventContext.Provider value={{ events, getAllEvents }}>
            <ToastContainer />
            {children}
        </GetEventContext.Provider>

    );
};

export default GetEventsProvider;
;
