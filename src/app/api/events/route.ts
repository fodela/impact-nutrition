import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { verifyUserRole } from '@/lib/verifyUserRole';
import { parse } from 'url';

const prisma = new PrismaClient();

export async function GET() {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "You are not authenticated" }, { status: 401 })

    //@ts-ignore
    if (!verifyUserRole(session.user.role, 'POSTS')) return NextResponse.json({ error: "You are not authorized!" }, { status: 401 })
    //@ts-ignore
    const authorId = session.user.id;
    try {
        const { title, details, location, organizers } = await req.json();
        if (!title || !details || !location || !organizers) {
            return NextResponse.json({ "message": "Missing required data" }, { status: 400 })
        }
        const post = await prisma.post.create({
            //@ts-ignore
            data: { title, details, location, authorId, organizers },
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
        const { id, title, details, location, organizers } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Missing required data" }, { status: 400 });
        }

        const event = await prisma.event.findUnique({ where: { id } });
        if (!event) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        //@ts-ignore
        await validateAuthorization(session, authorId, 'ADMINISTRATOR');

        const updateEvent = await prisma.event.update({
            where: { id },
            data: { title, details, location, organizers, },
        });

        return NextResponse.json(updateEvent, { status: 200 });
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
        const event = await prisma.event.findUnique({ where: { id } });
        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        //@ts-ignore
        await validateAuthorization(session, authorId, 'ADMINISTRATOR');
        //@ts-ignore
        await prisma.event.delete({ where: { id } });

        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}