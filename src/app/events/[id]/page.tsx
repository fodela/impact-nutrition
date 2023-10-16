/* eslint-disable react-hooks/exhaustive-deps */
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
import EventRegistrationBtn from "@/components/eventsRegisterBtn";

const EventPage = () => {
    const { data: session, status } = useSession();
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
                        <div className="flex max-h-96 max-w-xl mx-auto">
                            {image && <Image width={1000} height={500} className="rounded-md" src={image.toString()} alt="post image" />}
                        </div>
                        <div className="max-w-xl my-4 mx-auto rounded-md">
                            <p className="py-4">{location}</p>
                            {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
                            <div className="inline-flex border-b-2 my-4 border-b-green-700">Price: {price}</div>
                        </div>
                        
                        {<EventRegistrationBtn id={id} myEvents={myEvents} />}

                        <div className="max-w-xl my-4 mx-auto rounded-md">
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
