import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "You are not logged in!" },
      { status: 400 }
    );
  }
  //@ts-ignore

  try {
    const { userId, eventId, amount, paid } = await req.json();

    // Check if the user is already registered for the event
    const existingAttendee = await prisma.attendee.findFirst({
      where: {
        registrantId: userId,
        eventId: eventId,
      },
    });

    if (!existingAttendee) {
      return NextResponse.json(
        { message: "This user is not registered for this event" },
        { status: 400 }
      );
    }
    const payment = await prisma.payment.create({
      data: {
        receipt: eventId,
        amount: amount,
        userId,
      },
    });

    await prisma.attendee.update({
      where: {
        id: existingAttendee.id,
      },
      data: {
        amount_paid: amount + existingAttendee.amount_paid,
        paid,
      },
    });

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
}
