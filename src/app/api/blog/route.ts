import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { verifyUserRole } from '@/lib/verifyUserRole';

const prisma = new PrismaClient();

export async function GET() {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    console.log(session, 'session')
    if (!session) return NextResponse.json({ error: "You are not authenticated" }, { status: 401 })

    //@ts-ignore
    if (!verifyUserRole(session.user.role, 'POSTS')) return NextResponse.json({ error: "You are not authorized!" }, { status: 401 })
    //@ts-ignore
    const authorId = session.user.id;
    try {
        const { title, content, slug, author, imageUrl } = await req.json();
        if (!title || !content || !slug) {
            return NextResponse.json({ "message": "Missing required data" }, { status: 400 })
        }
        const post = await prisma.post.create({
            data: { title, content, slug, author, authorId, imageUrl },
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
