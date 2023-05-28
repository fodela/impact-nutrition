'use client'
import React, { useEffect, useState } from "react";
import { getPublishedPosts } from "../../lib/getPosts";
import Hero from "../../components/Hero";
import { Post } from "@prisma/client";
import Link from "next/link";

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPublishedPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);



  return (
    <main className="main">
      <Hero />
      <section className="max-w-screen-xl px-4 md:mx-auto">
        <h2 className="heading_secondary">Blogs</h2>
        {(!posts.length) && <div className="text-center">Loading!</div>}
        <div className="grid md:grid-cols-2 mt-4 gap-6">
          {posts.map((post) => (
            //@ts-ignore
            <article key={post.id} className="flex flex-col gap-4">
              <img
                className="rounded-md max-h-96"
                src={post.imageUrl?.toString()}
                alt="post image"
              />
              <div className="border rounded-md">
                <h3 className="heading_tertiary">{post.title}</h3>
                <p>{post.slug}</p>
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : null}
              </div>
              <Link className="btn_primary" href={`/blog/${post.id}`} legacyBehavior>
                <a className="btn_primary flex">Read more</a>
              </Link>
            </article>
          ))}
        </div>
        <div className="flx hidden justify-center">
          <button className="border-blue-800 text-center mt-6 border px-4 py-2 rounded-md">
            Load
          </button>
        </div>
      </section>
    </main>
  );
};

export default Blog;
