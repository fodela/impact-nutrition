import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { firstname, lastname, username, email } = req.body;
    const user = await prisma.user.create({
        data: { firstname, lastname, username, email },
      });
  
      res.status(201).json({ user });
}