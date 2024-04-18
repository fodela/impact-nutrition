import { authOptions } from "@/app/utils/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export interface paramsProp {
  params: {
    id: string;
  };
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const { user } = session;

  if (!user) {
    NextResponse.json(
      { message: "Kindly log in to update your profile." },
      { status: 400 }
    );
  }
  const { profession, professional_pin } = await req.json();

  try {
    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        profession,
        professional_pin,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    return NextResponse.json({ message: "Sorry, we could not get the user" });
  }
}
