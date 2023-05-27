'use client'
import React, { useEffect, useState } from "react";
import getPosts from "../../lib/getPosts";
import Hero from "../../components/Hero";
import { Post } from "@prisma/client";

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
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
      <section className="max-w-screen-xl md:mx-auto">
        <h2 className="heading_secondary">Blogs</h2>
        {(!posts.length) && <div>Loading!</div>}
        <div className="grid md:grid-cols-2 mt-4 gap-6">
          {posts.map((post) => (
            //@ts-ignore
            <article key={post.id} className="flex flex-col gap-4">
              <img
                className="rounded-md"
                src={post.imageUrl?.toString()}
                alt="post image"
              />
              <div className="border rounded-md">
                <h3 className="heading_tertiary">{post.title}</h3>
                <p>{post.slug}</p>
                ``
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : null}
              </div>
              <div className="flex gap-2">
                <button className="btn_primary">Read more</button>
                <button className="border-blue-800 border px-4 py-2 rounded-md">
                  Learn more
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="border-blue-800 text-center mt-6 border px-4 py-2 rounded-md">
            Load more
          </button>
        </div>
      </section>
    </main>
  );
};

export default Blog;
