import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { parse } from "url";
import prisma from "@/lib/prisma";
import { generateToken } from "@/lib/tokenUtils";
import { sendMailValidationEmail } from "@/lib/sendEmail";


export async function POST(req: Request) {
    try {
      const { password, token } = await req.json();
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

      const hashed_password = await hash(password, 12);
      // Find the user associated with the verification token
      const user = await prisma.user.findUnique({
        where: { phone: verificationToken.identifier },
      });

      if (!user) {
        return NextResponse.json({ message: "User not found" }, {status: 404});
      }

      // Mark the user's email as verified
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed_password },
      });

      // Delete the verification token from the database
      await prisma.verificationToken.delete({
        where: { token: String(token) },
      });

      return NextResponse.json(
        { message: "Password Change was successful!" },
        { status: 200 }
      );
    } catch (error) {
         return NextResponse.json(error);
    }
}