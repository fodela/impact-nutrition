import { NextApiRequest } from 'next';
import prisma from '@/lib/prisma';
import { sendMailValidationEmail } from '@/lib/sendEmail';
import { authenticateUser } from '@/lib/authUtils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return NextResponse.json(
        { message: "You are not logged in!" },
        { status: 400 }
      );
    }

    const { userId, eventId, amount, paid, receipt } = await req.json();

    const attendee = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!attendee) {
      return NextResponse.json(
        { message: "We were unable to find the specified attendee that made this payment" },
        { status: 400 }
      );
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
      title: `Impact Nutrition: Hello ${attendee.name}, payment received.`,
      message: `Welcome, ${attendee.name}! <br> 
       We have received a payment of ${amount} and just credited your account. <br>
        The receipt number is <b>${receipt}</b>. <br>
       Thank you. <br>
       Yours Sincerely,<br>
       Impact Nutrition Consult.`,
      receiverEmail: attendee.email,
      link: "",
    });

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      //@ts-ignore
      { message: "Something went wrong!", error: error.message },
      { status: 500 }
    );
  }
}
