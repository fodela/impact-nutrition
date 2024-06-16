import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { sendMailValidationEmail } from '@/lib/sendEmail';
import { generateToken } from '@/lib/tokenUtils';

export async function POST(req: Request) {
  const { firstname, lastname, phone, professional_pin, email, password, profession } = await req.json();

  if (!firstname || !lastname || !phone || !password) {
    return NextResponse.json({ message: 'Missing required data' }, { status: 400 });
  }

  try {
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: `${firstname.trim()} ${lastname.trim()}`,
        phone: phone.trim(),
        professional_pin: professional_pin.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        profession: profession.trim(),
      },
    });

    const verificationToken = generateToken();

    await prisma.verificationToken.create({
      data: {
        identifier: user.phone,
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const link = `${process.env.LOCALURL}/api/verifyuser/${verificationToken}`;

    await sendMailValidationEmail({
      title: 'Impact Nutriton: Email Verification',
      message: `Welcome, ${user.name}! Please verify your email by clicking on the following link: ${link}`,
      receiverEmail: user.email,
      link,
    });

    return NextResponse.json({ user: { name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
