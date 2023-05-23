import { verifyUserRole } from "@/lib/verifyUserRole";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

type Params = {
    params: {
        id: string
    }
}

export async function GET({ params: { id } }: any) {

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PATCH(req: Request, { params: { id } }: Params) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "You are not authenticated" }, { status: 401 })
    //@ts-ignore
    if (!verifyUserRole(session.user.role, 'POSTS')) return NextResponse.json({ error: "You are not authorized!" }, { status: 401 })
}



export async function DELETE(req: Request, { params: { id } }: Params) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "You are not authenticated" }, { status: 401 })
    //@ts-ignore
    if (!verifyUserRole(session.user.role, 'POSTS')) return NextResponse.json({ error: "You are not authorized!" }, { status: 401 })
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        await prisma.post.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
