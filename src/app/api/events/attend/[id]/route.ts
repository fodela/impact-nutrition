import { paramsProp } from "@/app/api/users/update/route";
import { NextResponse } from "next/server";

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
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.log(error, "erro");
    NextResponse.json(error, { status: 500 });
  }
}
