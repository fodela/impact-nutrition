import dynamic from "next/dynamic";
import { FC, memo, useState } from "react";
import { Attendee, Event } from "@prisma/client";
import UpdateEventForm from "./UpdateEventForm";
import { useSession } from "next-auth/react";

interface FormProps {
    id: string;
    amount: number;
    eventId: string;
    receipt: string;
}

type AddPaymentProps = {
    isOpen: boolean;
    onClose: () => void;
    attendee: Attendee
    eventId: string;
};


const handleSubElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
};

const AddPayment: FC<AddPaymentProps> = ({
    isOpen,
    onClose,
    attendee,
    eventId
}) => {
    const { data: session, status } = useSession()
    //@ts-ignore
    const { user } = session
    const [paymentInputs, setPaymentInput] = useState<FormProps>({
        id: user.id,
        amount: 0,
        eventId,
        receipt: ""
    });

    const {
        id,
        amount,
        receipt
    } = paymentInputs;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(id, amount, eventId)
    }

    if (!isOpen) return null;
    return (
        <div
            className="fixed dark:text-black flex justify-center items-center w-screen inset-0 bg-gray-800 bg-opacity-50"
            onClick={onClose}
        >
            <div
                onClick={handleSubElementClick}
                className={`max-w-lg bg-white lg:m-6 rounded-lg lg:p-6 z-20 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-1000 ease-linear`}
            >
                <h1 className="font-bold text-center uppercase text-2xl">
                    Add new payment
                </h1>

                <div>
                    <form className="p-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="amount" className="block mb-2 font-bold">
                                amount
                            </label>
                            <input
                                type="text"
                                id="amount"
                                required
                                className="w-full px-4 py-2 border rounded-lg"
                                value={amount}
                                onChange={(e) =>
                                    setPaymentInput((prevState) => ({
                                        ...prevState,
                                        amount: Number(e.target.value),
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="receipt" className="block mb-2 font-bold">
                                Receipt
                            </label>
                            <input
                                type="text"
                                id="receipt"
                                required
                                className="w-full px-4 py-2 border rounded-lg"
                                value={receipt}
                                onChange={(e) =>
                                    setPaymentInput((prevState) => ({
                                        ...prevState,
                                        receipt: (e.target.value),
                                    }))
                                }
                            />
                        </div>

                        <button type="submit" className="bg-colorPrimary rounded-md text-white px-4 py-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(AddPayment);
