/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroDetail } from "../../../types";
import Hero from "@/components/Hero";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getEvents } from "../redux/actions/eventsAction";

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
  const { events, error } = useAppSelector(state => state.events)
  const dispatch = useAppDispatch()
  console.log(events, 'events')

  useEffect(() => {
    !events?.length && dispatch(getEvents())
  }, []);

  if (!events) return <h1>Loading....</h1>;

  return (
    <main className="main">
      <Hero heroDetail={eventHeroDetail} />
      <section className="max-w-screen-xl px-4 md:mx-auto">
        <h2 className="heading_secondary">Events</h2>
        <div className="grid grid-cols-1 grid-container mt-4 gap-6">
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
