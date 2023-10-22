/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GetEventContext } from "@/components/context/EventContext";
import { HeroDetail } from "../../../types";
import Hero from "@/components/Hero";

const eventHeroDetail: HeroDetail = {
  heading: "Don't Miss Out on What's Coming",
  content: "Exciting Moments Just Around the Corner",
  imageLink: "/assets/Images/food/food2.png",
  showMainButton: true,
  showSecondaryButton: true,
  mainButtonName: "",
  secondaryButtonName: "",
  mainLink: "",
  secondaryLink: "",
};

const EventDisplay = dynamic(
  () => import("@/components/EventDisplay/EventDisplay")
);

const Events = () => {
  const { events, getAllEvents } = useContext(GetEventContext);
  useEffect(() => {
    getAllEvents();
  }, []);

  if (!events) return <h1>Loading....</h1>;

  return (
    <main className="main">
      <Hero heroDetail={eventHeroDetail} />
      <section className="max-w-screen-xl px-4 md:mx-auto">
        <h2 className="heading_secondary">Events</h2>
        <div className="grid md:grid-cols-2 mt-4 gap-6">
          {events.length ? (
            events.map((event) => (
              <div key={event.id}>
                <EventDisplay event={event} />
              </div>
            ))
          ) : (
            <h1 className="text-center">No Event</h1>
          )}
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
