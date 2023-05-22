import { PrismaClient, Session } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { verifyUserRole } from '@/lib/verifyUserRole';
import { parse } from 'url';

const prisma = new PrismaClient();

export async function GET() {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
}

export async function validateAuthorization(session: Session, authorId: String, requiredRole: String) {
    if (!session) {
        return NextResponse.json({ error: "You are not authenticated" }, { status: 401 });
    }
    //@ts-ignore
    // aa
    if (!verifyUserRole(session.user.role, requiredRole)) {
        return NextResponse.json({ error: "You are not authorized!" }, { status: 401 });
    }
    //@ts-ignore
    const currentUserRole = session?.user.id;
    if (currentUserRole !== authorId && !verifyUserRole(currentUserRole, 'ADMINISTRATOR')) {
        return NextResponse.json({ error: "You are not authorized to perform this action" }, { status: 401 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const authorId = session?.user?.id;

    try {
        const { title, content, slug, author, imageUrl } = await req.json();
        if (!title || !content || !slug) {
            return NextResponse.json({ message: "Missing required data" }, { status: 400 });
        }
        //@ts-ignore
        await validateAuthorization(session, authorId, 'POSTS');

        const post = await prisma.post.create({
            data: { title, content, slug, author, authorId, imageUrl },
        });

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const authorId = session?.user?.id;

    try {
        const { id, title, content, slug, author, imageUrl, published } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Missing required data" }, { status: 400 });
        }

        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        //@ts-ignore
        await validateAuthorization(session, authorId, 'ADMINISTRATOR');

        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content, slug, author, authorId, imageUrl, published },
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const authorId = session?.user?.id;
    try {
        const { id } = parse(req.url || '', true).query;

        if (!id) {
            return NextResponse.json({ message: "Missing required data" }, { status: 400 });
        }
        //@ts-ignore
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        //@ts-ignore
        await validateAuthorization(session, authorId, 'ADMINISTRATOR');
        //@ts-ignore
        await prisma.post.delete({ where: { id } });

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error, 'errror')
        return NextResponse.json(error, { status: 500 });
    }
}
