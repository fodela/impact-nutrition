import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { parse } from "url";
import prisma from "@/lib/prisma";
import { validateAuthorization } from "@/lib/validateAuthorization";
import { authOptions } from "@/app/utils/authOptions";

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: {
      eventDate: "desc", // Sorting events by eventDate in descending order
    },
  });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?.id;
  if (!session) {
    return NextResponse.json(
      { message: "You are not logged in!" },
      { status: 400 }
    );
  }

  try {
    const {
      title,
      details,
      location,
      organizers,
      image,
      price,
      paymentLink,
      eventDate,
      excerpt,
    } = await req.json();
    let Evprice = Number(price);
    if (!title || !details || !location) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    try {
      //@ts-ignore
      await validateAuthorization(session, userId, "EVENTS");
    } catch (error) {
      //@ts-ignore
      return NextResponse.json({ message: error?.message }, { status: 401 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        details,
        location,
        excerpt,
        organizers,
        image,
        price: Evprice,
        paymentLink,
        userId,
        eventDate,
      },
    });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  if (!session.user) {
    NextResponse.json(
      { message: "Kindly log in to update an event." },
      { status: 400 }
    );
  }

  //@ts-ignore
  const userId = session?.user?.id;

  try {
    const {
      id,
      title,
      details,
      image,
      location,
      excerpt,
      price,
      paymentLink,
      organizers,
      eventDate,
    } = await req.json();


    let evPrice = Number(price);
    if (!id) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id } });

    if (!event) {
      return NextResponse.json({ message: "event not found" }, { status: 404 });
    }
    try {
      //@ts-ignore
      await validateAuthorization(session, userId, "EVENTS");
    } catch (error) {
      //@ts-ignore
      return NextResponse.json({ message: error?.message }, { status: 401 });
    }
    const updatedevent = await prisma.event.update({
      where: { id },
      data: {
        title,
        details,
        location,
        excerpt,
        organizers,
        image,
        price: evPrice,
        paymentLink,
        eventDate,
      },
    });


    //update the event price for each of the attendees

    const attendees = await prisma.attendee.findMany({
      where: {
        eventId: event.id,
      },
    });
    for (const attendee of attendees) {
      await prisma.attendee.update({
        where: { id: attendee.id },
        data: {
          amount_due: evPrice,
        },
      });
    }
    return NextResponse.json(updatedevent, { status: 200 });
  } catch (error) {
    //@ts-ignore
    const message = error?.message ? error?.message : "something went wrong!";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?.id;
  try {
    const { id } = parse(req.url || "", true).query;

    if (!id) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }
    //@ts-ignore
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ message: "event not found" }, { status: 404 });
    }

    // Check if the user is authorized to delete the event.
    //@ts-ignore
    await validateAuthorization(session, userId, "EVENTS");

    // Delete the attendees associated with the event.
    const attendees = await prisma.attendee.findMany({
      where: {
        eventId: event.id,
      },
    });
    for (const attendee of attendees) {
      await prisma.attendee.delete({
        where: {
          id: attendee.id,
        },
      });
    }

    // Delete the event.
    //@ts-ignore
    await prisma.event.delete({ where: { id } });

    return NextResponse.json(
      { message: "event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
