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
    totalPayments: Number;
    getAllPayments: () => void;
}

export const GetPaymentContext = createContext<GetPaymentContextType>({
    payments: [],
    totalPayments: 0,
    getAllPayments: () => { },
});




const GetPaymentProvider = ({ children }: ChildrenProps) => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [totalPayments, setTotalPayments] = useState<Number>(0);

    const getAllPayments = async () => {
        try {
            const payment: Payment[] = await getPayments();
            setPayments(payment);
            let amount = payment.reduce((accumulator, payment) => {
                return accumulator + payment.amount;
            }, 0);
            setTotalPayments(amount)
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
        <GetPaymentContext.Provider value={{ payments, totalPayments, getAllPayments }}>
            <ToastContainer />
            {children}
        </GetPaymentContext.Provider>

    );
};

export default GetPaymentProvider;