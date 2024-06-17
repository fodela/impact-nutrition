import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';
import { authenticateUser } from '@/lib/authUtils';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Id missing" }, { status: 404 });
  }

  try {
    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json(
        { message: "You are not logged in!" },
        { status: 400 }
      );
    }

    const userId = user.id;

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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
