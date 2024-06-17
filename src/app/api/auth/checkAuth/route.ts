import { authenticateUser } from '@/lib/authUtils';
import { $Enums } from '@prisma/client';
import { NextResponse } from 'next/server';

export interface  userSession {
  id: string;
  name: string;
  email: string | null;
  role: $Enums.UserRole;
}

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);
    return NextResponse.json({ authenticated: true, user } , { status: 200 });
  } catch (error) {
    //@ts-ignore
    return NextResponse.json( { authenticated: false, message: error.message }, { status: 401 });
  }
}
