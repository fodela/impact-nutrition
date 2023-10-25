import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export interface tokenParamProp {
    params: {
        token: string;
    };
};


export async function GET(req: Request, { params: { token } }: tokenParamProp) {

    try {
        // Find the verification token in the database
        if (!token) {
            return NextResponse.json({ error: "Are you lost?" }, { status: 400 });
        }
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token: String(token) },
        });

        if (!verificationToken) {
            return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
        }

        // Check if the token has expired
        if (new Date() > verificationToken.expires) {
            return NextResponse.json({ message: 'Token has expired' }, { status: 401 });
        }

        // Find the user associated with the verification token
        const user = await prisma.user.findUnique({
            where: { phone: verificationToken.identifier },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }

        // Mark the user's email as verified
        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
        });

        // Delete the verification token from the database
        await prisma.verificationToken.delete({ where: { token: String(token) } });

        return NextResponse.json({ message: 'Email verification successful' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred during email verification' }, { status: 500 });
    }
}
