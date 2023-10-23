'use client'
import dynamic from "next/dynamic";
import { FC, useContext, useState } from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor CSS
import { toast } from 'react-toastify';
import { Event } from "@prisma/client";
import { getEvents, updateEvent } from "@/lib/getEvents";
import { GetEventContext } from "@/components/context/EventContext";

interface FormProps {
    id: string;
    title: string;
    event?: string;
    details: string,
    location: string;
    image?: string;
    price: string | number;
    paymentLink?: string;
    organizers?: string;
}
type AddEventProp = {
    onClose: () => void,
    event: Event
}
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});



const UpdateEventForm: FC<AddEventProp> = ({ onClose, event }) => {
    const { events, getAllEvents } = useContext(GetEventContext);
    const [eventInputs, setEventInputs] = useState<FormProps>({
        id: event.id,
        title: event.title,
        details: event.details,
        //@ts-ignore
        image: event.image,
        price: event.price || 0,
        paymentLink: event.paymentLink || "",
        location: event.location,
        organizers: event.organizers,
    });

    const {
        id,
        title,
        details,
        image,
        location,
        paymentLink,
        price,
        organizers,
    } = eventInputs;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newEvent = await updateEvent(
                id,
                title,
                details,
                //@ts-ignore
                paymentLink,
                image,
                location,
                price,
                organizers
            )
            getAllEvents();
            setEventInputs(
                //@ts-ignore
                {
                    id: "",
                    title: "",
                    details: "",
                    location: "",
                    image: "",
                    price: "",
                    organizers: "",
                })
            const notify = () => toast.success("Event Updated!");
            notify()
            newEvent?.id && onClose()
        } catch (error) {
            //@ts-ignore
            const notify = () => toast.error(error?.message ? error?.message : "Something went wrong!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            notify()
        }

    };

    const handleContentChange = (content: string) => {
        setEventInputs((prevState) => ({
            ...prevState,
            details: content,
        }));
    };

    return (
        <div>
            <form className="p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                        value={title}
                        onChange={(e) =>
                            setEventInputs((prevState) => ({
                                ...prevState,
                                title: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="details" className="block mb-2 font-bold">
                        Details
                    </label>
                    <SunEditor
                        placeholder="Please type here..."
                        onChange={handleContentChange}
                        setContents={details}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block mb-2 font-bold">
                        Location
                    </label>
                    <input
                        type="text"
                        required
                        id="location"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={location}
                        onChange={(e) =>
                            setEventInputs((prevState) => ({
                                ...prevState,
                                location: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="paymentLink" className="block mb-2 font-bold">
                        Payment Link
                    </label>
                    <input
                        type="text"
                        id="paymentLink"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={paymentLink}
                        onChange={(e) =>
                            setEventInputs((prevState) => ({
                                ...prevState,
                                paymentLink: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2 font-bold">
                        Price
                    </label>
                    <input
                        type="text"
                        required
                        id="price"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={price}
                        onChange={(e) =>
                            setEventInputs((prevState) => ({
                                ...prevState,
                                price: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 font-bold">
                        Image URL
                    </label>
                    <input
                        required
                        type="text"
                        id="image"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={image}
                        onChange={(e) =>
                            setEventInputs((prevState) => ({
                                ...prevState,
                                image: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="organizers" className="block mb-2 font-bold">
                        Organizers
                    </label>
                    <input
                        required
                        type="text"
                        id="organizers"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={organizers}
                        onChange={(e) =>
                            setEventInputs((prevState) => ({
                                ...prevState,
                                organizers: e.target.value,
                            }))
                        }
                    />

                </div>
                <div className="flex">
                    <button
                        type="submit"
                        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEventForm;
