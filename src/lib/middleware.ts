import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { authenticateUser } from './authUtils';

export const withAuth = (handler: NextApiHandler) => {
  return async (req: Request, res: NextApiResponse) => {
    try {
      const user = await authenticateUser(req);
      req.user = user;
      return handler(req, res);
    } catch (error) {
      //@ts-ignore
      return NextResponse.json( { authenticated: false, message: error.message }, { status: 401 });
    }
  };
};
