import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const { firstname, lastname, username, email } = await req.json();
    if(!firstname || !lastname ||  !username || !email) {
      return NextResponse.json({"message": "Missing required data"})
    }
    const user = await prisma.user.create({
      data: { firstname, lastname, username, email },
    });
     return NextResponse.json( user );
  } catch (error) {    
    return NextResponse.json( error);
  }
}
