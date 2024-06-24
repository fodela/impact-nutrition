'use client'
import { createContext, useState } from "react";
import { Attendee, Event, Payment, User } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { getAttendees } from "@/lib/getPayments";
import { getUser } from "@/lib/getUser";


export interface GetUserContextType {
    currentUser: User[];
    getCurrentUser: (id: string) => void;
}

export const GetUserContext = createContext<GetUserContextType>({
    currentUser: [],
    getCurrentUser: (id) => { },
});



//@ts-expect-error
const GetUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User[]>([]);

    const getCurrentUser = async (id:string) => {
        try {
            const usr: User[] = await getUser(id);
            setCurrentUser(usr);
        } catch (error) {
            toast.error("Unable to get your profile. check your internet", {
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
        <GetUserContext.Provider value={{ currentUser, getCurrentUser }}>
            <ToastContainer />
            {children}
        </GetUserContext.Provider>

    );
};

export default GetUserProvider;