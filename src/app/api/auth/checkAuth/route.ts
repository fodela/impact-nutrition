import { authenticateUser } from '@/lib/authUtils';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);
    return NextResponse.json({ authenticated: true, user } , { status: 200 });
  } catch (error) {
    console.log('error', error)
    //@ts-ignore
    return NextResponse.json( { authenticated: false, message: error.message }, { status: 401 });
  }
}
