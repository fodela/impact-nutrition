import prisma from "@/lib/prisma";
import { validateAuthorization } from "@/lib/validateAuthorization";
import { authenticateUser } from "@/lib/authUtils";
import { NextApiRequest } from 'next';
import { NextResponse } from "next/server";
import { parse } from "url";

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json(
        { message: "You are not logged in!" },
        { status: 400 }
      );
    }
    const authorId = user.id;
    const { title, content, slug, author, imageUrl, published, excerpt } = await req.json();

    if (!title || !content || !slug) {
      return NextResponse.json(
        { message: "Missing required data: title, content, or slug" },
        { status: 400 }
      );
    }

    await validateAuthorization(user, authorId, "POSTS");

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        author,
        authorId,
        imageUrl,
        published,
        excerpt,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json(
        { message: "You are not logged in!" },
        { status: 400 }
      );
    }
    const authorId = user.id;
    const { id, title, content, slug, author, imageUrl, published, excerpt } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Missing required data: id" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await validateAuthorization(user, authorId, "POSTS");

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        author,
        authorId,
        imageUrl,
        published,
        excerpt,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json(
        { message: "You are not logged in!" },
        { status: 400 }
      );
    }
    const authorId = user.id;
    const { id } = parse(req.url || "", true).query;

    if (!id) {
      return NextResponse.json(
        { message: "Missing required data: id" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: String(id) } });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await validateAuthorization(user, authorId, "POSTS");

    await prisma.post.delete({ where: { id: String(id) } });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
