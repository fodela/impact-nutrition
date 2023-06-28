/* eslint-disable react-hooks/exhaustive-deps */
'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Attendee, Event } from "@prisma/client";
import { useParams } from "next/navigation";
import { addEventAttendee, getEventById } from "@/lib/getEvents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import AddPayment from "@/components/Dashboard/DashboardEvent/AddPayment";

const EventPage = () => {
    const { data: session, status } = useSession()
    const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null)
    const [addPayment, setAddPayment] = useState(false)
    const { id } = useParams();
    const addPaymentRef = useRef<HTMLDivElement | null>(null);

    const [event, setEvent] = useState<Event | null>(null);


    const [isLoading, setIsLoading] = useState(true);

    const toggleUpdatePayment = useCallback(() => {
        setAddPayment(prevState => !prevState);
    }, []);

    const memoizedSelectedAttendee = useMemo(() => selectedAttendee, [selectedAttendee]);
    const handleAddPayment = useCallback((id: string) => {
        //@ts-ignore
        const attende = event?.attendees.find(att => att.id === id);
        if (attende?.id) {
            setSelectedAttendee(attende);
            toggleUpdatePayment();
        }
        //@ts-ignore
    }, [event?.attendees, toggleUpdatePayment]);

    const fetchEvent = async () => {
        try {
            const fetchedEvent = await getEventById(id);
            setEvent(fetchedEvent);
            setIsLoading(false);
        } catch (error) {
            console.error("Unable to get event:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchEvent();
        }
        console.log('runinng')
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


    const { title, image, location, details } = event;


    return (
        <div>
            <main className="main">
                <section className="max-w-screen-xl px-4 md:mx-auto">
                    <h2 className="heading_secondary">{title}</h2>
                    <article className="block mx-auto">
                        <div className="flex max-h-96 max-w-xl mx-auto">
                            {image && (
                                <img
                                    className="rounded-md"
                                    src={image.toString()}
                                    alt="post image"
                                />
                            )}
                        </div>

                        <div className="max-w-xl my-4 mx-auto rounded-md">
                            <p>Price: {event.price}</p>
                            <p className="py-4">{location}</p>
                            {details && (
                                <div dangerouslySetInnerHTML={{ __html: details }} />
                            )}
                        </div>

                        <div className="max-w-xl my-4 mx-auto rounded-md">
                            <ToastContainer />
                            <h3 className="text-xl font-bold">List of Event attendees</h3>
                            <div className="flex mt-6 flex-col">
                                {
                                    //@ts-ignore
                                    event?.attendees?.length ? (
                                        //@ts-ignore
                                        event?.attendees.map((att: Attendee) => {
                                            //@ts-ignore
                                            const { user } = att
                                            return (
                                                <div className="mt-3 flex justify-between" key={att.id}>
                                                    <div className="font-bold">Name: <span className="text-green-700">{user.name}</span></div>
                                                    <div className="font-bold">Payment Status: <span className="text-green-700">{att.paid ? "Paid" : 'Unpaid'}</span></div>
                                                    <div className="font-bold">Amount Due: <span className="text-green-700">{att.amount_due}</span></div>
                                                    <div className="font-bold">Amount Paid: <span className="text-green-700">{att.amount_paid}</span></div>
                                                    <AddPayment isOpen={addPayment} onClose={toggleUpdatePayment}
                                                        getEventAgain={fetchEvent}
                                                        //@ts-ignore
                                                        attendee={memoizedSelectedAttendee} eventId={id} addPaymentRoot={addPaymentRef} />
                                                    <button className="bg-colorPrimary rounded-md text-white px-3 font-bold" onClick={() => handleAddPayment(att.id)}>Add payment</button>
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
