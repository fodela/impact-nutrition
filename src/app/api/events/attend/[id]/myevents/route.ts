import { paramsProp } from "@/app/api/users/update/route";
import { authOptions } from "@/app/utils/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { id } }: paramsProp) {
  if (!id) {
    return NextResponse.json({ error: "Id missing" }, { status: 404 });
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "You are not logged in!" },
        { status: 400 }
      );
    }
    //@ts-ignore
    const userId = session?.user?.id;

    const registeredEvents = await prisma.event.findMany({
      where: {
        attendees: {
          some: {
            registrantId: userId,
          },
        },
      },
    });

    return NextResponse.json(registeredEvents);
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
}
