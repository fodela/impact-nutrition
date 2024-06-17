import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/authUtils";

export async function PUT(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return NextResponse.json(
        { message: "Kindly log in to update your profile." },
        { status: 400 }
      );
    }

    const { profession, professional_pin } = await req.json();

    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        profession,
        professional_pin,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ message: "Sorry, we could not update the user", error: error.message }, { status: 500 });
  }
}
