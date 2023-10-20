import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { parse } from "url";
import prisma from "@/lib/prisma";
import { generateToken } from "@/lib/tokenUtils";
import { sendMailValidationEmail } from "@/lib/sendEmail";
import { Hash } from "crypto";
import { hash } from "bcrypt";

export async function PUT(req: Request) {
  try {
    const { password, token } = await req.json();
    console.log(password, token, "data");
    if (!token || !password) {
      return NextResponse.json(
        { message: "token or new password not provided!" },
        { status: 400 }
      );
    }
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token: String(token) },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Find the user associated with the verification token
    const user = await prisma.user.findUnique({
      where: { phone: verificationToken.identifier },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const hashed_password = await hash(password, 12);
    // update the user password
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed_password },
    });
   

    if (!updated) {
      return NextResponse.json(
        { message: "Password update failed" },
        { status: 500 }
      );
    } else {
      // Delete the verification token from the database
       await sendMailValidationEmail({
         title: "Impact Nutriton: Password Recovery",
         message: `Welcome, ${user.name}! you have successfully reset your password!. <br/> If this was not done by you kindly reach out immidiately!`,
         receiverEmail: user.email,
         link: "",
       });
      await prisma.verificationToken.delete({
        where: { token: String(token) },
      });
      return NextResponse.json(
        { message: "Password Change was successful!" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
