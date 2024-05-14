/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect } from "react";
import { GetPostsContext } from "@/components/context/PostContext";
import PostComponent from "@/components/Dashboard/DashboardPost/PostComponent";
import { HeroDetail } from "../../../types";
import Hero from "@/components/Hero";

const blogHeroDetail: HeroDetail = {
  heading: "Stay Updated with Our Blog",
  content: "Your Source for Health and Nutrition Insights",
  imageLink: "/assets/Images/Professional4.jpg",
  showMainButton: true,
  showSecondaryButton: true,
  mainButtonName: "",
  secondaryButtonName: "",
  mainLink: "",
  secondaryLink: "",
};

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
      <Hero heroDetail={blogHeroDetail} />
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
