import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';


export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  // try {
  //   const { firstname, lastname, username, email } = await req.json();
  //   if(!firstname || !lastname ||  !username || !email) {
  //     return NextResponse.json({"message": "Missing required data"})
  //   }
  //   const user = await prisma.user.create({
  //     data: { firstname, lastname, username, email },
  //   });
  //    return NextResponse.json( user );
  // } catch (error) {    
  //   return NextResponse.json( error);
  // }
}
