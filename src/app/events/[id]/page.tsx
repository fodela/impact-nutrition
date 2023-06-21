/* eslint-disable @next/next/no-img-element */
'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { useParams } from "next/navigation";
import Loading from "../loading";
import { addEventAttendee, getEventById } from "@/lib/getEvents";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventPage = () => {
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
                theme: "colored"
            });
        } catch (error) {
            console.log("error", error);
            //@ts-ignore
            toast.error(error?.response.data.message ? error?.response.data.message : "We were unable to add you to the event!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    };

    const { id } = useParams();

    const [event, setEvent] = useState<Event | null>(null);
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

    const { title, image, location, details } = event;

    return (
        <div>
            <main className="main">
                <section className="max-w-screen-xl px-4 md:mx-auto">
                    <h2 className="heading_secondary">{title}</h2>
                    <article className="block mx-auto">
                        <div className="flex max-h-96 max-w-md mx-auto">
                            {image && (
                                <img
                                    className="rounded-md"
                                    src={image.toString()}
                                    alt="post image"
                                />
                            )}
                        </div>

                        <div className="max-w-md my-4 mx-auto rounded-md">
                            <p className="py-4">{location}</p>
                            {details && (
                                <div dangerouslySetInnerHTML={{ __html: details }} />
                            )}
                        </div>
                        <div className="max-w-md my-4 mx-auto rounded-md">
                            <button
                                className="p-3 bg-green-600 rounded-md text-white"
                                onClick={() => {
                                    eventAddAttendee(id);
                                }}
                            >
                                Attend Event
                            </button>
                        </div>

                        <div className="max-w-md my-4 mx-auto rounded-md">
                            <h3 className="text-xl font-bold">List of Event attendees</h3>
                            <ul>
                                {event?.attendees?.length ? (
                                    event.attendees.map((att) => (
                                        <li className="font-bold" key={att.id}>
                                            {att.user.name}
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
