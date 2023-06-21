import React, { FC } from "react";
import Link from "next/link";
import { Event } from "@prisma/client";
type eventProps = {
  event: Event;
};
const EventDisplay: FC<eventProps> = ({ event }) => {
  return (
    <article key={event.id} className="flex flex-col gap-4">
      {event.image && <img
        className="rounded-md max-h-96"
        src={event.image?.toString()}
        alt="post image"
      />}
      <div className="rounded-lg">
        <h3 className="heading_tertiary capitalize">{event.title}</h3>
        <p>{event.location}</p>
      </div>
      <div className="flex">
        <Link className="btn_primary" href={`/events/${event.id}`} legacyBehavior>
          <a className="btn_primary font-bold">Read more</a>
        </Link>
      </div>
    </article>
  );
};

export default EventDisplay;
