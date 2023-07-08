'use client'
import { createContext, useState } from "react";
import { ChildrenProps } from "../NextAuthProvider";
import { Attendee, Event, Payment } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { getAttendees } from "@/lib/getPayments";


export interface GetAttendeesContextType {
    attendees: Attendee[];
    getAllattendees: () => void;
}

export const GetAttendeesContext = createContext<GetAttendeesContextType>({
    attendees: [],
    getAllattendees: () => { },
});




const GetAttendeeProvider = ({ children }: ChildrenProps) => {
    const [attendees, setAttendees] = useState<Attendee[]>([]);

    const getAllattendees = async () => {
        try {
            const attendees: Attendee[] = await getAttendees();
            setAttendees(attendees);
        } catch (error) {
            toast.error("Unable to get attendees. check your internet", {
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
        <GetAttendeesContext.Provider value={{ attendees, getAllattendees }}>
            <ToastContainer />
            {children}
        </GetAttendeesContext.Provider>

    );
};

export default GetAttendeeProvider;