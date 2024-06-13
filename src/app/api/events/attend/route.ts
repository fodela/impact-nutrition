import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendMailValidationEmail } from "@/lib/sendEmail";
import { auth } from "../../../../../auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
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
        registrantId: userId,
        eventId: eventId,
      },
    });

    if (existingAttendee) {
      return NextResponse.json(
        { message: "You are already registered for this event" },
        { status: 400 }
      );
    }
    const attendee = await prisma.attendee.create({
      data: {
        eventId,
        registrantId: userId,
        amount_paid: 0,
        amount_due: event?.price,
      },
    });

    // const link = `${process.env.LOCALURL}/api/verifyuser/${verificationToken}`;

    const { user } = session;
    // Send the email verification email
    await sendMailValidationEmail({
      title: `Impact Nutriton: You just registered for the event ${event.title}`,
      message: `Welcome, ${user.email}! <br> We are happy to see you at our upcoming event: ${event.title}. Kindly note that if this event is priced, you will be required to pay the amount needed to receive your certificate!`,
      receiverEmail: user.email,
      link: "",
    });

    return NextResponse.json(attendee, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
}
