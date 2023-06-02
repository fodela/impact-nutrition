'use client'
import React, { useEffect, useState } from "react";
import { Post } from "@prisma/client";
import { getPostById } from "@/lib/getPosts";
import { useParams } from "next/navigation";
import Loading from "../loading";
import dynamic from "next/dynamic";


const Hero = dynamic(() => import("@/components/Hero"))


const PostPage = () => {
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
        return <Loading />
    }

    return (
        <div>
            <Hero />
            <main className="main">
                <section className="max-w-screen-xl px-4 md:mx-auto">
                    <h2 className="heading_secondary">{post.title}</h2>
                    <article className="block mx-auto">
                        <div className="flex max-h-96 max-w-md mx-auto">
                            <img
                                className="rounded-md "
                                src={post.imageUrl?.toString()}
                                alt="post image"
                            />
                        </div>

                        <div className="max-w-md my-4 mx-auto rounded-md">
                            <p className="py-4">{post.slug}</p>
                            {post.content ? (
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            ) : null}
                        </div>
                    </article>
                </section>
            </main>
        </div>

    );
};

export default PostPage;
