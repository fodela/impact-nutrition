'use client'
import React, { useEffect, useState } from "react";
import { Attendee, Event } from "@prisma/client";
import { useParams } from "next/navigation";
import Loading from "../loading";
import { addEventAttendee, getEventById, getMyEvents } from "@/lib/getEvents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { checkIdExists } from "@/lib/tokenUtils";
import Image from "next/image";

const EventPage = () => {
    const { data: session, status } = useSession();
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const fetchedEvent = await getEventById(id);
                setEvent(fetchedEvent);
                setIsLoading(false);
            } catch (error) {
                console.error("Unable to get event:", error);
            }
        };

        const getAllMyEvents = async () => {
            try {
                const allMyEvents = await getMyEvents(id);
                setMyEvents(allMyEvents);
            } catch (error) {
                console.log("myeventserr", error);
            }
        };

        if (id) {
            fetchEvent();
            getAllMyEvents();
        }

        return () => {
            // Cleanup function to cancel any pending requests or subscriptions
        };
    }, [id]);

    const eventAddAttendee = async (id: string) => {
        try {
            await addEventAttendee(id);
            toast.success("Awesome! you are registered to attend this event", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            //@ts-ignore
            const errorMessage = error?.response?.data?.message || "We were unable to add you to the event!";
            toast.error(errorMessage, {
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
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!event) {
        return <p>Event not found.</p>;
    }
    //@ts-ignore
    const { attendees, title, image, location, details, price } = event;

    return (
        <div>
            <main className="main">
                <section className="max-w-screen-xl px-4 md:mx-auto">
                    <h2 className="heading_secondary">{title}</h2>
                    <article className="block mx-auto">
                        <div className="flex max-h-96 max-w-md mx-auto">
                            {image && <Image width={1000} height={500} className="rounded-md" src={image.toString()} alt="post image" />}
                        </div>
                        <div className="max-w-md my-4 mx-auto rounded-md">
                            <p className="py-4">{location}</p>
                            {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
                            <div className="inline-flex border-b-2 my-4 border-b-green-700">Price: {price}</div>
                        </div>
                        <div className="max-w-md my-4 mx-auto rounded-md">
                            {!checkIdExists(myEvents, id) ? (
                                <button className="p-3 bg-colorPrimary rounded-md text-white" onClick={() => eventAddAttendee(id)}>
                                    Attend Event
                                </button>
                            ) : !session ? (
                                <a className="p-3 bg-colorPrimary rounded-md text-white" href="/login">
                                    Login to attend event
                                </a>
                            ) : (
                                <p>You have already registered for this event</p>
                            )}
                        </div>
                        <div className="max-w-md my-4 mx-auto rounded-md">
                            <ToastContainer />
                            <h3 className="text-xl font-bold">List of Event attendees</h3>
                            <ul>
                                {attendees?.length ? (
                                    attendees.map((att: Attendee) => (
                                        <li className="font-bold" key={att.id}>
                                            {
                                                //@ts-ignore
                                                att.user.name}
                                        </li>
                                    ))
                                ) : (
                                    <li>No one has registered yet</li>
                                )}
                            </ul>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default EventPage;
