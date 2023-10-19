import { sendMailValidationEmail } from "@/lib/sendEmail";
import { generatePasswordToken, generateToken } from "@/lib/tokenUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    if (!phone) {
      return NextResponse.json(
        { message: "Provide phone number" },
        { status: 404 }
      );
    }
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (!user.email) {
      return NextResponse.json(
        {
          message:
            "You did not provide an email when you were registring an account.",
        },
        { status: 400 }
      );
    }

    // Generate a unique verification token
    const verificationToken = generatePasswordToken(); // Implement the `generateToken` function to generate a unique token

    // Save the verification token to the VerificationToken table
    await prisma.verificationToken.create({
      data: {
        identifier: user.phone,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set an expiration date for the token (e.g., 24 hours)
      },
    });

    const link = `${process.env.LOCALURL}/api/email_password_recovery/${verificationToken}`;

    // Send the email verification email
    await sendMailValidationEmail({
      title: "Impact Nutriton: Password REcovery",
      message: `Welcome, ${user.name}! you have requested for a password change. User this token to change your password: ${verificationToken}`,
      receiverEmail: user.email,
      link,
    });
    NextResponse.json({ user: user.email }, {status: 200});
  } catch (error) {}
}
