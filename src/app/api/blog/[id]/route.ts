
import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { paramsProp } from "../../users/[id]/route";



export async function GET(req: Request, { params: { id } }: paramsProp) {

    try {
        if (!id) {
            return NextResponse.json({ error: "Post not found!" }, { status: 400 });
        }


        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        NextResponse.json(error, { status: 500 });
    }
}

