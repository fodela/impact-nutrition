import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
  try {
    const { name, username, date_of_birth, email, password } = (await req.json()) as {
      name: string
      username: string;
      date_of_birth: string;
      email: string;
      password: string;
    };
    if (!name || !username || !email || !password) {
      return NextResponse.json({ "message": "Missing required data" })
    }


    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        date_of_birth: new Date(date_of_birth),
        username,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
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
