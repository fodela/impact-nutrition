/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useContext, useEffect } from "react";
import { GetPostsContext } from "@/components/context/PostContext";
import PostComponent from "@/components/Dashboard/DashboardPost/PostComponent";

const Blog = () => {
  const { pubPosts, getAllPubPosts } = useContext(GetPostsContext);

  useEffect(() => {
    // Fetch the posts when the component mounts
    getAllPubPosts();
  }, []);

  if (!pubPosts) {
    return <h1>Loading</h1>;
  }

  return (
    <main className="main">
      <section className="max-w-screen-xl px-4 md:mx-auto">
        <h2 className="heading_secondary">Blogs</h2>
        <div className="grid md:grid-cols-2 mt-4 gap-6">
          {pubPosts.map((post) => (
            <PostComponent key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
