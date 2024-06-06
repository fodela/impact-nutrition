import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '../../../../../auth';
import { NextResponse } from 'next/server';

export  async function POST(req: Request) {

  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
        return NextResponse.json(
          { message: "Missing required data title content or slug" },
          { status: 400 }
        );
      }

    const result = await signIn('credentials', {
      phone,
      password,
      redirect: false,
    });

    if (result) {
      NextResponse.json({ success: true, url: result.url }, { status: 200 });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ message: error?.message || "Something went wrong!" }, { status: 401 });
  }
}
