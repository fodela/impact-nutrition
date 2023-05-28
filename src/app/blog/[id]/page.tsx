'use client'
import React, { useEffect, useState } from "react";
import { Post } from "@prisma/client";
import { getPostById } from "@/lib/getPosts";
import { NextRouter } from "next/router";
import { useParams } from "next/navigation";

type PostPageProps = {
    router: NextRouter;
};

const PostPage: React.FC<PostPageProps> = () => {
    const { id } = useParams();

    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await getPostById(id);
                setPost(fetchedPost);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (id) {
            fetchPost();
        }
    }, []);

    if (!post) {
        return <div>Loading....</div>
    }

    return (
        <main className="main">
            <section className="max-w-screen-xl px-4 md:mx-auto">
                <h2 className="heading_secondary">{post.title}</h2>
                <article className="flex flex-col gap-4">
                    <img
                        className="rounded-md max-h-96 max-w-md"
                        src={post.imageUrl?.toString()}
                        alt="post image"
                    />
                    <div className="border rounded-md">
                        <p>{post.slug}</p>
                        {post.content ? (
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        ) : null}
                    </div>
                </article>
            </section>
        </main>
    );
};

export default PostPage;
