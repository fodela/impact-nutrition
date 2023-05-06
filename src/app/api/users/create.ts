import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { firstname, lastname, username, email } = req.body;

    const user = await prisma.user.create({
      data: { firstname, lastname, username, email },
    });

    res.status(201).json({ user });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
    console.log(res, 'res')
    res.send('something went wrong!')
  }
};

export default handler;
