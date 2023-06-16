/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { useParams } from "next/navigation";
import Loading from "../loading";
import dynamic from "next/dynamic";
import { getEventById } from "@/lib/getEvents";

const Hero = dynamic(() => import("@/components/Hero"));

const EventPage = () => {
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
            <Hero />
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
                            {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default EventPage;
