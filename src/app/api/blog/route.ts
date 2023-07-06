import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { parse } from "url";
import prisma from "@/lib/prisma";
import { validateAuthorization } from "@/lib/validateAuthorization";

export interface userValidationErrors {
  error: string;
  status: number;
}

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const authorId = session?.user?.id;

  try {
    const { title, content, slug, author, imageUrl, published } =
      await req.json();
    if (!title || !content || !slug) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    try {
      //@ts-ignore
      await validateAuthorization(session, authorId, "POSTS");
    } catch (error) {
      //@ts-ignore
      return NextResponse.json({ message: error?.message }, { status: 401 });
    }

    const post = await prisma.post.create({
      data: { title, content, slug, author, authorId, imageUrl, published },
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
    const { id, title, content, slug, author, imageUrl, published } =
      await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    //@ts-ignore
    try {
      //@ts-ignore
      await validateAuthorization(session, authorId, "POSTS");
    } catch (error: any) {
      return NextResponse.json(error);
    }

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
    const { id } = parse(req.url || "", true).query;

    if (!id) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }
    //@ts-ignore
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    //@ts-ignore
    await validateAuthorization(session, authorId, "POSTS");
    //@ts-ignore
    await prisma.post.delete({ where: { id } });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
