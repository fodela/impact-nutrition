import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { paramsProp } from "../../users/[id]/route";

export async function GET(req: Request, { params: { id } }: paramsProp) {
  try {
    if (!id) {
      return NextResponse.json({ error: "Id missing" }, { status: 404 });
    }

    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
    });

    if (!event) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
}
