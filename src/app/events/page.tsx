'use client'
import React, { Suspense, useEffect, useState } from "react";
import { Event, Post } from "@prisma/client";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { getEvents } from "@/lib/getEvents";



const EventDisplay = dynamic(() => import("@/components/EventDisplay/EventDisplay"));

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents: Event[] = await getEvents();
        // const publishedPosts: Post[] = fetchedEvents.filter((post) => post.published);
        setEvents(fetchedEvents);
      } catch (error) {
        const notify = () => {
          //@ts-ignore
          toast.error(error?.message ? error.message : "Something went wrong!", {
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
    };

    fetchEvents();
  }, []);

  return (
    <main className="main">
      <section className="max-w-screen-xl px-4 md:mx-auto">
        <h2 className="heading_secondary">Events</h2>
        <div className="grid md:grid-cols-2 mt-4 gap-6">
          <Suspense fallback={<Loading />}>
            {events.length ? events.map((event) => (
              <Suspense key={event.id} fallback={<Loading />}>
                <EventDisplay event={event} />
              </Suspense>
            )) : <h1 className="text-center">No Event</h1>}
          </Suspense>
        </div>
        <div className="flx hidden justify-center">
          <button className="border-blue-800 text-center mt-6 border px-4 py-2 rounded-md">
            Load
          </button>
        </div>
      </section>
    </main>
  );
};

export default Events;
