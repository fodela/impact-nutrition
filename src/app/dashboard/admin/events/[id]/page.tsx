/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Attendee, Event } from "@prisma/client";
import { useParams } from "next/navigation";
import { addEventAttendee, getEventById } from "@/lib/getEvents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import AddPayment from "@/components/Dashboard/DashboardEvent/AddPayment";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const tags = [
  "Nutrition",
  "health",
  "CPD",
  "Good life",
  "GHS",
  "public health",
];


const EventPage = () => {
<<<<<<< HEAD:src/app/dashboard/events/[id]/page.tsx
  // const { data: session, status } = useSession()
  // const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null)
  // const [addPayment, setAddPayment] = useState(false)
  // const { id } = useParams();
  // const addPaymentRef = useRef<HTMLDivElement | null>(null);

  // const [event, setEvent] = useState<Event | null>(null);

  // const [isLoading, setIsLoading] = useState(true);

  // const toggleUpdatePayment = useCallback(() => {
  //     setAddPayment(prevState => !prevState);
  // }, []);

  // const memoizedSelectedAttendee = useMemo(() => selectedAttendee, [selectedAttendee]);
  // const handleAddPayment = useCallback((id: string) => {
  //     //@ts-ignore
  //     const attende = event?.attendees.find(att => att.id === id);
  //     if (attende?.id) {
  //         setSelectedAttendee(attende);
  //         toggleUpdatePayment();
  //     }
  //     //@ts-ignore
  // }, [event?.attendees, toggleUpdatePayment]);

  // const fetchEvent = async () => {
  //     try {
  //         const fetchedEvent = await getEventById(id);
  //         setEvent(fetchedEvent);
  //         setIsLoading(false);
  //     } catch (error) {
  //         console.error("Unable to get event:", error);
  //     }
  // };

  // useEffect(() => {
  //     if (id) {
  //         fetchEvent();
  //     }
  //     return () => {
  //         // Cleanup function to cancel any pending requests or subscriptions
  //     };
  // }, [id]);

  // if (isLoading) {
  //     return <h1>Loading...</h1>;
  // }

  // if (!event) {
  //     return <p>Event not found.</p>;
  // }

  // const { title, image, location, details } = event;

  return (
    // <div>
    //     <main className="main">
    //         <section className="max-w-screen-xl px-4 md:mx-auto">
    //             <h2 className="heading_secondary">{title}</h2>
    //             <article className="block mx-auto">
    //                 <div className="flex max-h-96 max-w-xl mx-auto">
    //                     {image && (
    //                         <img
    //                             className="rounded-md"
    //                             src={image.toString()}
    //                             alt="post image"
    //                         />
    //                     )}
    //                 </div>

    //                 <div className="max-w-xl my-4 mx-auto rounded-md">
    //                     <p>Price: {event.price}</p>
    //                     <p className="py-4">{location}</p>
    //                     {details && (
    //                         <div dangerouslySetInnerHTML={{ __html: details }} />
    //                     )}
    //                 </div>

    //                 <div className="max-w-xl my-4 mx-auto rounded-md">
    //                     <ToastContainer />
    //                     <h3 className="text-xl font-bold">List of Event attendees</h3>
    //                     <div className="flex mt-6 flex-col">
    //                         {
    //                             //@ts-ignore
    //                             event?.attendees?.length ? (
    //                                 //@ts-ignore
    //                                 event?.attendees.map((att: Attendee) => {
    //                                     //@ts-ignore
    //                                     const { user } = att
    //                                     return (
    //                                         <div className="mt-3 flex justify-between" key={att.id}>
    //                                             <div className="font-bold">Name: <span className="text-green-700">{user.name}</span></div>
    //                                             <div className="font-bold">Payment Status: <span className="text-green-700">{att.paid ? "Paid" : 'Unpaid'}</span></div>
    //                                             <div className="font-bold">Amount Due: <span className="text-green-700">{att.amount_due}</span></div>
    //                                             <div className="font-bold">Amount Paid: <span className="text-green-700">{att.amount_paid}</span></div>
    //                                             <AddPayment isOpen={addPayment} onClose={toggleUpdatePayment}
    //                                                 getEventAgain={fetchEvent}
    //                                                 //@ts-ignore
    //                                                 attendee={memoizedSelectedAttendee} eventId={id} addPaymentRoot={addPaymentRef} />
    //                                             <button className="bg-colorPrimary rounded-md text-white px-3 font-bold" onClick={() => handleAddPayment(att.id)}>Add payment</button>
    //                                         </div>
    //                                     )
    //                                 })
    //                             ) : (
    //                                 <div>No one has registered yet</div>
    //                             )}
    //                     </div>
    //                 </div>
    //             </article>
    //         </section>
    //     </main>
    // </div>
    <>
      <section className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,1),rgba(16,71,52,0.8)),url('/assets/Images/eventhero.jpg')] bg-cover bg-bottom bg-no-repeat py-16 grid md:grid-cols-2 gap-8 justify-between place-items-center text-white relative rounded-lg">
        <div className=" flex flex-col gap-4 p-8 max-w-screen-sm justify-left">
          <h2 className="capitalize text-4xl font-bold">
            Nutrition not as a choice but a lifestyle text-left
          </h2>
          <p className="mb-8 capitalize opacity-60">
            <span className="opacity-50">By</span> Nutritionist Association of
            ghana
          </p>
          <p className="opacity-50">
            Lorem, ipsum dolor sit amet consectetur adipisici Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Temporibus, naae hic velit
            consequuntur, animi iusto praesentium eos reprehenderit quo??
          </p>

          <div className="flex gap-4  rounded-lg">
            <CiLocationOn size={20} />
            <p className="opacity-70 capitalize font-bold">view map</p>
          </div>
        </div>
        <div className="bg-white text-black max-w-[310px] flex flex-col gap-2 p-4 sm:p-8 rounded-lg ">
          <h3 className="text-xl font-bold capitalize ">Date & Time</h3>
          <p className="capitalize opacity-40">
            Tuesday, Oct 24, 2023 at 10:05 PM
          </p>
          <button className="bg-colorPrimary  py-3 my-6 rounded text-white hover ">
            Register
          </button>
          <p className="capitalize opacity-30 text-center ">No Refunds</p>
        </div>
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-16">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-xl font-bold capitalize ">Description</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            saepe beatae rem fugit iusto aliquam voluptas, cupiditate esse ipsum
            ratione dolorum sit, maxime quaerat harum repellendus voluptates a
            odit omnis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, non
            error nulla perferendis eligendi pariatur suscipit iusto cupiditate
            perspiciatis officia sequi alias molestia.
          </p>
          <h3 className="text-xl font-bold capitalize mt-16">
            How can I contact the oganizer with any question?
          </h3>
          <p>
            Please visit <Link href="www.google.com">www.theorganizer.com</Link>{" "}
            and refer to the FAQ section for all questions and contact
            information
          </p>
=======
    const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null)
    const [addPayment, setAddPayment] = useState(false)
    const { id } = useParams();
    const addPaymentRef = useRef<HTMLDivElement | null>(null);

    const [event, setEvent] = useState<Event | null>(null);


    const [isLoading, setIsLoading] = useState(true);

    const toggleUpdatePayment = useCallback(() => {
        setAddPayment(prevState => !prevState);
    }, []);

    const memoizedSelectedAttendee = useMemo(() => selectedAttendee, [selectedAttendee]);
    const handleAddPayment = useCallback((id: string) => {
        //@ts-ignore
        const attende = event?.attendees.find(att => att.id === id);
        if (attende?.id) {
            setSelectedAttendee(attende);
            toggleUpdatePayment();
        }
        //@ts-ignore
    }, [event?.attendees, toggleUpdatePayment]);

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
            fetchEvent();
        }
        return () => {
            // Cleanup function to cancel any pending requests or subscriptions
        };
    }, [id]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!event) {
        return <p>Event not found.</p>;
    }


    const { title, image, location, details } = event;


    return (
        <div>
            <main className="main">
                <section className="max-w-screen-xl px-4 md:mx-auto">
                    <h2 className="heading_secondary">{title}</h2>
                    <article className="block mx-auto">
                        <div className="flex max-h-96 max-w-xl mx-auto">
                            {image && (
                                <img
                                    className="rounded-md"
                                    src={image.toString()}
                                    alt="post image"
                                />
                            )}
                        </div>

                        <div className="max-w-xl my-4 mx-auto rounded-md">
                            <p>Price: {event.price}</p>
                            <p className="py-4">{location}</p>
                            {details && (
                                <div dangerouslySetInnerHTML={{ __html: details }} />
                            )}
                        </div>

                        <div className="max-w-xl my-4 mx-auto rounded-md">
                            <ToastContainer />
                            <h3 className="text-xl font-bold">List of Event attendees</h3>
                            <div className="flex mt-6 flex-col">
                                {
                                    //@ts-ignore
                                    event?.attendees?.length ? (
                                        //@ts-ignore
                                        event?.attendees.map((att: Attendee) => {
                                            //@ts-ignore
                                            const { user } = att
                                            return (
                                                <div className="mt-3 flex justify-between" key={att.id}>
                                                    <div className="font-bold">Name: <span className="text-green-700">{user.name}</span></div>
                                                    <div className="font-bold">Payment Status: <span className="text-green-700">{att.paid ? "Paid" : 'Unpaid'}</span></div>
                                                    <div className="font-bold">Amount Due: <span className="text-green-700">{att.amount_due}</span></div>
                                                    <div className="font-bold">Amount Paid: <span className="text-green-700">{att.amount_paid}</span></div>
                                                    <AddPayment isOpen={addPayment} onClose={toggleUpdatePayment}
                                                        getEventAgain={fetchEvent}
                                                        //@ts-ignore
                                                        attendee={memoizedSelectedAttendee} eventId={id} addPaymentRoot={addPaymentRef} />
                                                    <button className="bg-colorPrimary rounded-md text-white px-3 font-bold" onClick={() => handleAddPayment(att.id)}>Add payment</button>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div>No one has registered yet</div>
                                    )}
                            </div>
                        </div>
                    </article>
                </section>
            </main>
>>>>>>> 2f9ea087464858b01a41b1c47ebec9aa7e198e7a:src/app/dashboard/admin/events/[id]/page.tsx
        </div>
        <aside className="flex flex-col gap-4">
          <iframe
            className="rounded-lg max-h-[300px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63535.441095193026!2d-0.2647485512387427!3d5.572182979006083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9090e8328315%3A0x32817fb671c349f!2sGhana%20Health%20Service%20Headquarters!5e0!3m2!1sen!2sgh!4v1698207701954!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="">
            {" "}
            <h3 className="text-xl font-bold capitalize ">
              Ghana health services conference room, accra
            </h3>
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
                <span className="px-4 py-2 wrap bg-slate-500 rounded text-white">
                  {tag}
                </span>
              ))}
            </div>
            <div className="">
              <h3 className="text-xl font-bold capitalize ">
                Share with friends
              </h3>
              <div className="flex gap-2">
                <FaFacebookF />
                <FaTwitter /> <FaInstagram />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default EventPage;
