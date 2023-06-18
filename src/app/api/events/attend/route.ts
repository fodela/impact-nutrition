import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "You are not logged in!" },
      { status: 400 }
    );
  }
  //@ts-ignore
  const userId = session?.user?.id;
  try {
    const { eventId } = await req.json();
    if (!eventId) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Check if the user is already registered for the event
    const existingAttendee = await prisma.attendee.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    console.log(existingAttendee, "exit");

    if (existingAttendee) {
      return NextResponse.json(
        { message: "You are already registered for this event" },
        { status: 400 }
      );
    }

    const attendee = await prisma.attendee.create({
      data: {
        eventId,
        userId,
        registrantId: userId,
        amount_paid: 0,
        amount_due: event?.price,
      },
    });

    return NextResponse.json(attendee, { status: 200 });
  } catch (error) {
    console.log(error, "er");
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
}
