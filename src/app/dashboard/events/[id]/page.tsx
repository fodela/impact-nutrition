'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Attendee, Event } from "@prisma/client";
import { useParams } from "next/navigation";
import { addEventAttendee, getEventById } from "@/lib/getEvents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const EventPage = () => {
    const { data: session, status } = useSession()
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
        return <h1>Loading...</h1>;
    }

    if (!event) {
        return <p>Event not found.</p>;
    }

    //@ts-expect-error
    const { attendees } = event
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
                            <ToastContainer />
                            <h3 className="text-xl font-bold">List of Event attendees</h3>
                            <div className="flex mt-6 flex-col">
                                {attendees?.length ? (
                                    attendees.map((att: Attendee) => {
                                        //@ts-ignore
                                        const { user } = att
                                        return (
                                            <div className="mt-3 flex justify-between" key={att.id}>
                                                <div className="font-bold">Name: <span className="text-green-700">{user.name}</span></div>
                                                <div className="font-bold">Payment Status: <span className="text-green-700">{att.paid ? "Paid" : 'Unpaid'}</span> </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div>No one has registered yet</div>
                                )}
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default EventPage;
