import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const cookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Immediately expire the cookie
    sameSite: 'strict',
    path: '/',
  });

  return NextResponse.json({ message: 'Logged out' }, { headers: { 'Set-Cookie': cookie } });
}
