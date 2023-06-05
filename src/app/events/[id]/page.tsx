/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { useParams } from "next/navigation";
import Loading from "../loading";
import dynamic from "next/dynamic";
import { getEventById } from "@/lib/getEvents";


const Hero = dynamic(() => import("@/components/Hero"))


const PostPage = () => {
    const { id } = useParams();

    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const fetchedEvent = await getEventById(id);
                setEvent(fetchedEvent);
            } catch (error) {
                const notify = () => {
                    //@ts-ignore
                    toast.error("Unable to get event! check your internet!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    notify();
                }
            }
        }
        if (id) {
            fetchEvent();
        }
    });

    if (!event) {
        return <Loading />
    }

    return (
        <div>
            <Hero />
            <main className="main">
                <section className="max-w-screen-xl px-4 md:mx-auto">
                    <h2 className="heading_secondary">{event.title}</h2>
                    <article className="block mx-auto">
                        <div className="flex max-h-96 max-w-md mx-auto">
                            {event.image && <img
                                className="rounded-md "
                                src={event.image?.toString()}
                                alt="post image"
                            />}
                        </div>

                        <div className="max-w-md my-4 mx-auto rounded-md">
                            <p className="py-4">{event.location}</p>
                            {event.details ? (
                                <div dangerouslySetInnerHTML={{ __html: event.details }} />
                            ) : null}
                        </div>
                    </article>
                </section>
            </main>
        </div>

    );
};

export default PostPage;
