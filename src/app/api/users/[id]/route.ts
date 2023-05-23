import { NextResponse } from 'next/server';

type Props = {
  params: {
    id: string;
  };
};


export async function GET(req: Request, { params: { id } }: Props) {
  // try {
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       username: id,
  //     },
  //   });

  //   if (!user) {
  //     return NextResponse.json({ message: 'User not found' });
  //   }

  //   return NextResponse.json(user);
  // } catch (error) {
  //   return NextResponse.json({ message: 'Sorry, we could not get the user' });
  // }
}
