import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Id missing" }, { status: 404 });
  }

  try {
    const session = await withAuth(req);
    if (!session?.user) {
      return NextResponse.json(
        { message: "You are not logged in!" },
        { status: 400 }
      );
    }

    const userId = (session.user).userId;

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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
