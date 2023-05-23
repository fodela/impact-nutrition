
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export async function GET(req: any, res: NextApiResponse) {
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

