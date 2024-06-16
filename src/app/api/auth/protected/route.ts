import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/lib/middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
};

export default withAuth(handler);
