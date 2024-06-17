import { NextResponse } from 'next/server';
import { parse } from 'url';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser } from '@/lib/authUtils';

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: {
      eventDate: "desc", // Sorting events by eventDate in descending order
    },
  });
  return NextResponse.json(events);
}

export const POST = async (req: Request, res: NextApiResponse) => {
  const user = await authenticateUser(req);
  
  if (!user) {
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
        userId: user?.id,
        eventDate,
      },
    });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
};

export const PUT = async (req: Request, res: NextApiResponse) => {
  const user = await authenticateUser(req);
  
  if (!user) {
    return NextResponse.json(
      { message: "You are not logged in!" },
      { status: 400 }
    );
  }
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
  } catch (error: any) {
    const message = error?.message ? error?.message : "something went wrong!";
    return NextResponse.json({ message }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {

  try {
    const { id } = parse(req.url || "", true).query;

    if (!id) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }
//@ts-expect-error
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ message: "event not found" }, { status: 404 });
    }

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
    //@ts-expect-error
    await prisma.event.delete({ where: { id } });

    return NextResponse.json(
      { message: "event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
