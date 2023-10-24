'use client'
import dynamic from "next/dynamic";
import { FC, useContext, useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor CSS
import { toast } from 'react-toastify';
import { Event } from "@prisma/client";
import { getEventById, getEvents, updateEvent } from "@/lib/getEvents";
import { GetEventContext } from "@/components/context/EventContext";
import { redirect, useParams } from "next/navigation";
import Loading from "@/app/events/loading";


const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});



const UpdateEventForm = () => {
    const { events, getAllEvents } = useContext(GetEventContext);
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const [eventInputs, setEventInputs] = useState<Event>({
        id: "",
        title: "",
        details:"",
        image: "",
        //@ts-ignore
        price: "",
        paymentLink: "",
        location: "",
        eventDate: new Date(),
        organizers: ""
    });


    console.log(eventInputs, 'inputs')

    const fetchEvent = async () => {
        try {
            const fetchedEvent = await getEventById(id);
            setEvent(fetchedEvent);
            fetchedEvent && setEventInputs(fetchedEvent)
            setIsLoading(false);
        } catch (error) {
            console.error("Unable to get event:", error);
        }
    };
    useEffect(() => {
        if (id) {
            fetchEvent();
        }

        return () => {
            // Cleanup function to cancel any pending requests or subscriptions
        };
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    if (!event) {
        return <p>Event not found.</p>;
    }

    const {
        title,
        details,
        image,
        location,
        paymentLink,
        price,
        organizers,
        eventDate
    } = eventInputs;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //@ts-ignore
            const newEvent = await updateEvent(eventInputs)
            console.log(newEvent, 'new Event')
            newEvent.length && getAllEvents();
            const notify = () => toast.success("Event Updated!");
            notify()
            if(newEvent?.id){
                window.location.href = "/dashboard/admin/events"
            }
          
        } catch (error) {
            //@ts-ignore
            const notify = () => toast.error("Something went wrong!", {
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
                    <label htmlFor="eventDate" className="block mb-2 font-bold">
                        Event Date And Time
                    </label>
                    <input
                        type="datetime-local"
                        required
                        id="eventDate"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={
                            eventDate instanceof Date
                                ? eventDate.toISOString().slice(0, 16)
                                //@ts-ignore
                                : eventDate.toString().slice(0, 16) // Provide a default value if eventDate is not a Date
                        }
                        onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            if (!isNaN(selectedDate.getTime())) {
                                console.log(selectedDate, 'date');
                                setEventInputs((prevState) => ({
                                    ...prevState,
                                    eventDate: selectedDate,
                                }));
                            } else {
                                console.error("Invalid date selected", selectedDate);
                            }
                        }}
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
                        //@ts-ignore
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
                                price: Number(e.target.value,)
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
                        //@ts-ignore
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
                        //@ts-ignore
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
                    {/* <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Close
                    </button> */}
                </div>
            </form>
        </div>
    );
};

export default UpdateEventForm;
