'use client'
import { createContext, useState } from "react";
import { ChildrenProps } from "../NextAuthProvider";
import { Event, Payment } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { getEvents } from "@/lib/getEvents";
import { getPayments } from "@/lib/getPayments";

export interface GetPaymentContextType {
    payments: Payment[];
    getAllPayments: () => void;
}

export const GetPaymentContext = createContext<GetPaymentContextType>({
    payments: [],
    getAllPayments: () => { },
});




const GetPaymentProvider = ({ children }: ChildrenProps) => {
    const [payments, setPayments] = useState<Payment[]>([]);

    const getAllPayments = async () => {
        try {
            const payment: Payment[] = await getPayments();
            setPayments(payment);
        } catch (error) {
            toast.error("Unable to get payments. check your internet", {
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
        <GetPaymentContext.Provider value={{ payments, getAllPayments }}>
            <ToastContainer />
            {children}
        </GetPaymentContext.Provider>

    );
};

export default GetPaymentProvider;