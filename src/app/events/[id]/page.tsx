/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { GetEventContext } from "@/components/context/EventContext";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

const tags = [
  "Nutrition",
  "health",
  "CPD",
  "Good life",
  "GHS",
  "public health",
];

const EventPage = () => {
  const { data: session, status } = useSession();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const { myEvents, getAllMyEvents } = useContext(GetEventContext);
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
    if (id) {
      !event?.id && fetchEvent();
      //@ts-ignore
      session?.user && getAllMyEvents(session?.user.id);
    }

    return () => {
      // Cleanup function to cancel any pending requests or subscriptions
    };
  }, [id]);

  console.log(event);

  if (isLoading) {
    return <Loading />;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }
  //@ts-ignore
  const {
    eventDate,
    title,
    organizers,
    paymentLink,
    image,
    location,
    details,
    price,
  } = event;

  const eventDateUpdate = new Date(eventDate);
  const year = eventDateUpdate.getFullYear();
  const month = eventDateUpdate.toLocaleString('default', { month: 'short' });
  const day = eventDateUpdate.getDate();
  const time = eventDateUpdate.toLocaleTimeString();

  return (
    //         <div>
    //             <main className="main">
    //                 <section className="max-w-screen-xl px-4 md:mx-auto">
    //                     <h2 className="heading_secondary">{title}</h2>
    //                     <article className="block mx-auto">
    //                         <div className="flex max-h-96 max-w-xl mx-auto">
    //                             {image && <Image width={1000} height={500} className="rounded-md" src={image.toString()} alt="post image" />}
    //                         </div>
    //                         <div className="max-w-xl my-4 mx-auto rounded-md">
    //                             <p className="py-4">{location}</p>
    //                             {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
    //                             <div className="inline-flex border-b-2 my-4 border-b-green-700">Price: {price}</div>
    //                         </div>

    //                         {<EventRegistrationBtn id={id} myEvents={myEvents} session={session} />}

    //                         <div className="max-w-xl my-4 mx-auto rounded-md">
    // =                            <h3 className="text-xl font-bold">List of Event attendees</h3>
    //                             <ul>
    //                                 {attendees?.length ? (
    //                                     attendees.map((att: Attendee) => (
    //                                         <li className="font-bold" key={att.id}>
    //                                             {
    //                                                 //@ts-ignore
    //                                                 att.user.name}
    //                                         </li>
    //                                     ))
    //                                 ) : (
    //                                     <li>No one has registered yet</li>
    //                                 )}
    //                             </ul>
    //                         </div>
    //                     </article>
    //                 </section>
    //             </main>
    //         </div>
    <>
      <section className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,1),rgba(16,71,52,0.8)),url('/assets/Images/eventhero.jpg')] bg-cover bg-bottom bg-no-repeat pb-16 pt-32 grid md:grid-cols-2 gap-8 justify-between place-items-center text-white relative rounded-lg">
        <div className=" flex flex-col gap-4 p-8 max-w-screen-sm justify-left">
          <h2 className="capitalize text-4xl font-bold">{title}</h2>
          <p className="mb-8 capitalize opacity-60">
            <span className="opacity-50">By </span>
            {organizers}
          </p>
          <div className="opacity-50">
            {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
          </div>

          <p>
            <span className="opacity-50">Price: </span> GHC {price}.00
          </p>
          <p>
            <span className="opacity-50">Attendees: </span>
            {/* <span className="text-primary font-bold">{attendees || "0"}</span> */}
          </p>

          <div className="flex gap-4  rounded-lg">
            <CiLocationOn size={20} />
            <Link href="#eventMap" className="opacity-70 capitalize font-bold">
              view map
            </Link>
          </div>
        </div>
        <div className="bg-white text-black w-[310px] flex flex-col gap-2 p-4 sm:p-8 rounded-lg ">
          <h3 className="text-xl font-bold capitalize ">Date & Time</h3>
          <p className="capitalize opacity-40">
            <p className="text-sm">{`${day} ${month} ${year}`}</p>
          </p>
          <div className="flex gap-4 py-6 text-colorPrimary">
            <BiPlus size={20} />{" "}
            <p>Add to Calendar</p>
          </div>
          {<EventRegistrationBtn id={id} myEvents={myEvents} session={session} />}
          
          <Link
            href={`${paymentLink}`}
            className="bg-colorPrimary  py-3  rounded text-white hover text-center"
          >
            Pay For Event
          </Link>
          <p className="capitalize opacity-30 text-center ">No Refunds</p>
        </div>
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-16 mx-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-xl font-bold capitalize ">Description</h3>
          {image && (
            <Image src={image.toString()} alt="event image" width={500} height={500} />
          )}
          {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
          <h3 className="text-xl font-bold capitalize mt-16">
            How can I contact the oganizer with any question?
          </h3>
          <p>
            Please visit{" "}
            <Link href="www.google.com" className="text-blue-500 underline">
              www.theorganizer.com
            </Link>{" "}
            and refer to the FAQ section for all questions and contact
            information
          </p>
        </div>

        <aside className="flex flex-col gap-4">
          <iframe
            id="eventMap"
            className="rounded-lg max-h-[300px] aspect-square"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63535.441095193026!2d-0.2647485512387427!3d5.572182979006083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9090e8328315%3A0x32817fb671c349f!2sGhana%20Health%20Service%20Headquarters!5e0!3m2!1sen!2sgh!4v1698207701954!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="">
            {" "}
            <h3 className="text-xl font-bold capitalize ">{location}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
              nesciunt consectetur nulla recusandae, aspernatur error nisi autem
              numquam, vel, distinctio animi voluptatibu libero.
            </p>
          </div>
          <div className="">
            <h3 className="text-xl font-bold capitalize ">Tags</h3>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span key={tag} className="px-4 py-2 wrap bg-slate-500 rounded text-white">
                  {tag}
                </span>
              ))}
            </div>
            <div className="">
              <h3 className="text-xl font-bold capitalize mt-4">
                Share with friends
              </h3>
              <div className="flex gap-2">
                <FaFacebookF />
                <FaTwitter />
                <FaInstagram />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default EventPage;
