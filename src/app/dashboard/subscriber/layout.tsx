"use client"
import { UpcomingEventCard } from "@/components/Dashboard/admin/UpcomingEventCard";
import GetAttendeeProvider from "@/components/context/AttendeeContext";
import { GetEventContext } from "@/components/context/EventContext";
import GetPaymentProvider from "@/components/context/PaymentContext";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { redirect } from "next/navigation";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { events, getAllEvents } = useContext(GetEventContext);

const {data: session, status} = useSession();
if (session) { // @ts-ignore
    if (session?.user?.role !== "SUBSCRIBER") {
        redirect("/dashboard/admin");
    }
}



    useEffect(() => {
        !events.length && getAllEvents();
        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex gap-8 justify-center">
            <div className="w-3/4">
                <GetPaymentProvider>
                    <GetAttendeeProvider>{children}</GetAttendeeProvider>
                </GetPaymentProvider>
            </div>
            <div className="flex flex-col text-stone-500 gap-4 w-1/4">
                <p className="text-sm">November 2023</p>
                <p className="text-black dark:text-white ">Upcoming Events</p>

                {events.map((event, index) => (
                    <UpcomingEventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
}
