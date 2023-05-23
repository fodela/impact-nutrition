<<<<<<< HEAD

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

=======
import { verifyUserRole } from "@/lib/verifyUserRole";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { validateAuthorization } from "../route";

>>>>>>> 9cb1323 (add events and post api)

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

