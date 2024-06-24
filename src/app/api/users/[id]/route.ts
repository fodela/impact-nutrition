import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { authenticateUser } from '@/lib/authUtils';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);

    if (!user) {
      return NextResponse.json(
        { message: "Kindly log in to update your profile." },
        { status: 400 }
      );
    }

    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
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
    return NextResponse.json({ message: "Sorry, we could not get the user" }, { status: 500 });
  }
}
