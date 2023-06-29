import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendMailValidationEmail } from "@/lib/sendEmail";

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
    const { userId, eventId, amount, paid, receipt } = await req.json();

    const atendee = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!atendee) {
      throw "We were unable to find the specified attendee that made this payment";
    }

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
        receipt,
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

    // Send the email verification email

    await sendMailValidationEmail({
      title: `Impact Nutriton: Hello ${atendee.name} payment received.`,
      message: `Welcome, ${atendee.name}! <br> 
       We have received a payment of ${amount} and just credited your account. <br>
        The receipt number is <b>${receipt}</b>. <br>
       Thank you. <br>
       Yours Sincerely,<br>
       Impact Nutrition Consult.
       `,
      receiverEmail: atendee.email,
      link: "",
    });

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 500 });
  }
}
