import { verifyUserRole } from "@/lib/verifyUserRole";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";

type Params = {
    id: string;
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id! as string;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
}




export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id! as string;
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
