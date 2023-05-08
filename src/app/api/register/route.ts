import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { hash } from "bcrypt";


const prisma = new PrismaClient();


export async function POST(req: Request) {
  try {
    const { firstname, lastname, username, date_of_birth, email, password } = (await req.json()) as {
      firstname: string;
      lastname: string;
      username: string;
      date_of_birth: string;
      email: string;
      password: string;
    };
    if(!firstname || !lastname ||  !username || !email || !password) {
        return NextResponse.json({"message": "Missing required data"})
      }


    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        date_of_birth: new Date(date_of_birth),
        username,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
