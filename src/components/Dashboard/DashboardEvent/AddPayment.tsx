import dynamic from "next/dynamic";
import { FC, memo, useState } from "react";
import { Attendee } from "@prisma/client";
import { useSession } from "next-auth/react";
import { addEventPayment } from "@/lib/getEvents";
import { ToastContainer, toast } from "react-toastify";

interface FormProps {
    id: string;
    amount: number;
    eventId: string;
    receipt: string;
    paid: boolean
}

type AddPaymentProps = {
    isOpen: boolean;
    onClose: () => void;
    attendee: Attendee;
    getEventAgain: () => void;
    eventId: string;
};


const handleSubElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
};

const AddPayment: FC<AddPaymentProps> = ({
    isOpen,
    onClose,
    attendee,
    getEventAgain,
    eventId
}) => {
    const [paymentInputs, setPaymentInput] = useState<FormProps>({
        id: "",
        amount: 0,
        eventId,
        receipt: "",
        paid: false
    });

    const {
        id,
        amount,
        receipt,
        paid
    } = paymentInputs;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let userId = attendee.registrantId
        try {
            await addEventPayment(eventId, userId, amount, paid)
            const notify = () => toast.success("Event created!",
                {
                    theme: "colored"
                });
            getEventAgain();
            notify();
            onClose()
        } catch (error) {
            const notify = () => {
                //@ts-ignore
                toast.error("Something went wrong!", {
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
            notify();
        }
    }

    if (!isOpen) return null;
    return (
        <div
            className="fixed dark:text-black flex justify-center items-center w-screen inset-0 bg-gray-800 bg-opacity-50"
            onClick={onClose}
        >
            <ToastContainer />
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
                                Receipt No
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
                        <div className="mb-4">
                            <label htmlFor="paid" className="flex justify-between mb-2 font-bold">
                                <input
                                    type="checkbox"
                                    id="paid"
                                    className="px-4 py-2 border rounded-lg"
                                    checked={paid}
                                    onChange={(e) =>
                                        setPaymentInput((prevState) => ({
                                            ...prevState,
                                            paid: (e.target.checked),
                                        }))
                                    }
                                />Payment completed
                            </label>
                        </div>
                        <button type="submit" className="bg-colorPrimary rounded-md text-white px-4 py-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(AddPayment);
