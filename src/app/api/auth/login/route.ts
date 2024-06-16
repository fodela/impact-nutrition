import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const { phone, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { phone: phone.trim() },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid phone number or password' }, { status: 401 });
    }

    const isValidPassword = await compare(password, user.password!);

    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid phone number or password' }, { status: 401 });
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      sameSite: 'strict',
      path: '/',
    });

    return NextResponse.json({ user: { id: user.id, phone: user.phone, name: user.name, email: user.email, role: user.role } }, { headers: { 'Set-Cookie': cookie } });
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
}
