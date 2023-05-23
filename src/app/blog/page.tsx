
import Image from "next/image";
import React from "react";
import getPosts from "../../lib/getPosts";
import Hero from "../../components/Hero";
import EditorJSContent from "@/components/EditorJSContent";

const blog = async () => {
  const posts = await getPosts();
  return (
    <main className="main">
      <Hero />
      <section className="max-w-screen-xl md:mx-auto">
        <h2 className="heading_secondary">Blogs</h2>
        <div className="grid md:grid-cols-2 mt-4 gap-6">
          {
            //@ts-ignore  
            posts.map((post) => (
              <article key={post.id} className="flex flex-col gap-4">
                <Image
                  //@ts-ignore 
                  className="rounded-md"
                  src={post.imageUrl?.toString()}
                  alt="post image"
                  width={800}
                  height={600}
                />
                <div className="border rounded-md">
                  <h3 className="heading_tertiary">{post.title}</h3>
                  <p>{post.slug}</p>

                  <EditorJSContent content={JSON.parse(post.content)} />
                </div>
                <div className=" flex gap-2">
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

export default blog;
