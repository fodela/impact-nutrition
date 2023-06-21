'use client'
import React, { Suspense, useContext, useEffect, useState } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { GetEventContext } from "@/components/context/EventContext";



const EventDisplay = dynamic(() => import("@/components/EventDisplay/EventDisplay"));

const Events = () => {
  const { events, getAllEvents } = useContext(GetEventContext);
  useEffect(() => {
    getAllEvents()
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
