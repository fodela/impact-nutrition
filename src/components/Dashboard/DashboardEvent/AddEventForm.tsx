'use client'
import dynamic from "next/dynamic";
import { useState, ChangeEvent, FormEvent, memo } from "react";
import { toast } from 'react-toastify';
import 'suneditor/dist/css/suneditor.min.css';
import { createEvent } from "@/lib/getEvents";

export interface EventFormProps {
    title: string;
    details: string;
    location: string;
    excerpt: string;
    organizers: string;
    paymentLink?: string;
    eventDate: Date,
    price: string;
    image: string;
}

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});


const AddEventForm = () => {
    const [eventInputs, setEventInputs] = useState<EventFormProps>({
        title: "",
        details: "",
        location: "",
        organizers: "",
        paymentLink: "",
        excerpt: "",
        eventDate: new Date(),
        price: "",
        image: ""
    });

    const {
        title,
        details,
        location,
        excerpt,
        organizers,
        price,
        eventDate,
        paymentLink,
        image, } = eventInputs;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const event = await createEvent(eventInputs);
            setEventInputs({
                title: "",
                details: "",
                location: "",
                organizers: "",
                excerpt: "",
                eventDate: new Date(),
                price: '',
                image: "",
            });
            const notify = () => toast.success("Event created!");
            notify();
            window.location.href = '/dashboard/admin/events';
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
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "eventDate") {
            const selectedDate = new Date(value);
            if (!isNaN(selectedDate.getTime())) {
                setEventInputs((prevState) => ({
                    ...prevState,
                    [name]: selectedDate,
                }));
            } else {
                console.error("Invalid date selected", selectedDate);
            }
        } else {
            setEventInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleContentChange = (details: string) => {
        setEventInputs((prevState) => ({
            ...prevState,
            details: details,
        }));
    };

    const handleErceptChange = (excerpt: string) => {
        setEventInputs((prevState) => ({
            ...prevState,
            excerpt: excerpt,
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
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="details" className="block mb-2 font-bold">
                        details
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
                        name="location"
                        value={location}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="excerpt" className="block mb-2 font-bold">
                        Excerpt
                    </label>
                    <SunEditor
                        placeholder="Please type here..."
                        onChange={handleContentChange}
                        setContents={excerpt}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventDate" className="block mb-2 font-bold">
                        Event Date
                    </label>
                    <input
                        type="datetime-local"
                        value={
                            eventDate instanceof Date
                                ? eventDate.toISOString().slice(0, 16)
                                //@ts-ignore
                                : eventDate.toString().slice(0, 16) // Provide a default value if eventDate is not a Date
                        }
                        required
                        id="eventDate"
                        className="w-full px-4 py-2 border rounded-lg"
                        name="eventDate"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="paymentLink" className="block mb-2 font-bold">
                        Payment Link
                    </label>
                    <input
                        type="text"
                        required
                        id="paymentLink"
                        className="w-full px-4 py-2 border rounded-lg"
                        name="paymentLink"
                        value={paymentLink}
                        onChange={handleInputChange}
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
                        name="price"
                        value={price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 font-bold">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        className="w-full px-4 py-2 border rounded-lg"
                        name="image"
                        value={image}
                        onChange={handleInputChange}
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
                        name="organizers"
                        value={organizers}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex">
                    <button
                        type="submit"
                        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEventForm;
