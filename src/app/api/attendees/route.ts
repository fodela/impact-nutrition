import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const attendees = await prisma.attendee.findMany({
    include: {
      user: {
        select: {
          id: true, // Include specific fields of the user model if needed
          name: true,
          // Add more fields as necessary
        },
      },
      event: {
        select: {
          title: true,
        },
      },
    },
  });

  return NextResponse.json(attendees);
}
