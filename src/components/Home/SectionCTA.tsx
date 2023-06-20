"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SectionCTA = () => {
  return (
    <section className="">
      <div
        className="
    max-w-screen-md grid md:grid-cols-2  gap-6 sm:w-10/12 
    bg-[#11200A]
     bottom-10 shadow-sm  sm:rounded p-4 md:p-8 mx-auto
     sm:-translate-y-1/2
     "
        //  relative
        //  before:content-[''] before:p-16 before:rounded-full before:bg-white before:absolute before:-top-8 before:-left-8 before:-z-20
        //  after:content-[''] after:p-16 after:rounded-full after:bg-white after:absolute after:-bottom-8 after:-right-8 after:-z-30
      >
        <div
          className="max-w-screen-sm flex-col justify-center  md:flex 
      text-white "
        >
          <h1 className="text-sm">Create an account</h1>
          <p className="text-2xl font-bold">
            A free account will get you started
          </p>
        </div>
        <div className="flex gap-4 justify-end items-center justify-self-end">
          <button
            className="text-white bg-white/10 rounded py-2 px-4 hover:bg-gray-800 "
            onClick={() => signIn()}
          >
            Contact Us
          </button>
          <button className="text-white bg-colorPrimary rounded py-2 px-4 hover:bg-blue-950 font-bold">
            Login / Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionCTA;
