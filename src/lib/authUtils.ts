import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';
import prisma from './prisma';
import { NextApiRequest } from 'next';

export const authenticateUser = async (req: Request) => {
  const cookieHeader = req.headers.get('cookie');

  if (!cookieHeader) {
    throw new Error('Unauthorized');
  }

  const { token } = parse(cookieHeader);

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    throw new Error('Unauthorized');
  }
};
