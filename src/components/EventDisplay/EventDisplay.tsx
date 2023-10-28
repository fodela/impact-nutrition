import React, { FC } from "react";
import Link from "next/link";
import { Event } from "@prisma/client";
import Image from "next/image";
type eventProps = {
  event: Event;
};
const EventDisplay: FC<eventProps> = ({ event }) => {
  return (
    <article key={event.id} className="flex flex-col gap-4">
      {event.image && <Image
        width={1000}
        height={500}
        className="rounded-md max-h-96"
        src={event.image?.toString()}
        alt="post image"
      />}
      <div className="rounded-lg">
        <h3 className="heading_tertiary capitalize">{event.title}</h3>

        <p>{event.location}</p>
      </div>
      <div className="flex justify-between">
        <Link className="btn_primary" href={`/events/${event.id}`} legacyBehavior>
          <a className="btn_primary font-bold">Read more</a>
        </Link>
      {
          event.paymentLink &&  <Link className="btn_primary" href={`${event.paymentLink}`} legacyBehavior>
          <a target="_blank" className="btn_primary font-bold">Make payment</a>
        </Link>
      } 
      </div>
    </article>
  );
};

export default EventDisplay;
