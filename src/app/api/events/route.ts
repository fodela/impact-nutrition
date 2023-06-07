import { PrismaClient, Session } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { parse } from "url";
import prisma from "@/lib/prisma";
import { validateAuthorization } from "@/lib/validateAuthorization";

export async function GET() {
  const events = await prisma.event.findMany();
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
    const { title, details, location, organizers, image } = await req.json();

    if (!title || !details || !location || !organizers) {
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
        organizers,
        image,
        userId,
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
  const userId = session?.user?.id;

  try {
    const { id, title, details, location, organizers, image, userId } =
      await req.json();

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
      data: { id, title, details, location, organizers, image },
    });

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
    try {
      //@ts-ignore
      await validateAuthorization(session, userId, "EVENTS");
    } catch (error) {
      //@ts-ignore
      return NextResponse.json({ message: error?.message }, { status: 401 });
    }
    //@ts-ignore
    await prisma.event.delete({ where: { id } });

    return NextResponse.json(
      { message: "event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    //@ts-ignore
    const message = error?.message ? error?.message : "something went wrong!";
    return NextResponse.json({ message }, { status: 500 });
  }
}
