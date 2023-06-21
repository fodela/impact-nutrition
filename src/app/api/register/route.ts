import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { sendMailValidationEmail } from "@/lib/sendEmail";
import { generateToken } from "@/lib/tokenUtils";

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
    if (!firstname || !lastname || !username || !email || !password) {
      return NextResponse.json({ "message": "Missing required data" }, { status: 400 })
    }

    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: `${firstname} ${lastname}`,
        date_of_birth: new Date(date_of_birth),
        username,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    // Generate a unique verification token
    const verificationToken = generateToken(); // Implement the `generateToken` function to generate a unique token

    // Save the verification token to the VerificationToken table
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set an expiration date for the token (e.g., 24 hours)
      },
    });

    const link = `${process.env.LOCALURL}/api/verifyuser/${verificationToken}`

    // Send the email verification email
    await sendMailValidationEmail({
      title: "Impact Nutriton: Email Verification",
      message: `Welcome, ${user.name}! Please verify your email by clicking on the following link: ${link}`,
      receiverEmail: user.email,
      link
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
