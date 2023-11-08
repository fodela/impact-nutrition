import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const { user } = session;

  if (!user) {
    NextResponse.json(
      { message: "Kindly log in to update your profile." },
      { status: 400 }
    );
  }
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });


    if (!userData) {
      return NextResponse.json({ message: "User not found" });
    }

    return NextResponse.json({
      userData: {
        id: userData.id,
        name: userData.name,
        phone: userData.phone,
        profession: userData.profession,
        professional_pin: userData.professional_pin,
        email: userData.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Sorry, we could not get the user" });
  }
}
