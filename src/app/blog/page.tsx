'use client'
import React, { Suspense, useEffect, useState } from "react";
import { getPublishedPosts } from "../../lib/getPosts";
import { Post } from "@prisma/client";
import Link from "next/link";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
// import Hero from "@/components/Hero";

const PostComponent = dynamic(() => import("@/components/Dashboard/DashboardPost/PostComponent"));
const Hero = dynamic(() => import("../../components/Hero"));

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPublishedPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        const notify = () =>
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        notify();
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="main">
      <Hero />
      <section className="max-w-screen-xl px-4 md:mx-auto">
        <h2 className="heading_secondary">Blogs</h2>
        <div className="grid md:grid-cols-2 mt-4 gap-6">
          <Suspense fallback={<Loading />}>
            {posts.map((post) => (
              <Suspense key={post.id} fallback={<Loading />}>
                <PostComponent post={post} />
              </Suspense>
            ))}
          </Suspense>
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
