"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SectionCTA = () => {
  return (
    <section className="">
      <div
        className="
    max-w-screen-md grid md:grid-cols-2  gap-6 w-10/12 
    bg-[#091206] bg-opacity-95
     bottom-10 shadow-sm  rounded p-4 md:p-8 mx-auto
     -translate-y-1/2
     overflow-hidden
     "
      >
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-r from-black via-[#091206] to-[#7f9278] rounded-full   -z-10 opacity-75" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-l from-black via-[#091206] to-[#7f9278] rounded-full   -z-10 opacity-30" />

        <div
          className="max-w-screen-sm flex-col justify-center  md:flex 
      text-white "
        >
          <h1 className="text-sm font-semibold">Create an account</h1>
          <p className="text-2xl font-bold">
            A free account will get you started
          </p>
        </div>
        <div className="flex gap-4 justify-end items-center justify-self-end">
          <button
            className="text-white  hover:text-colorPrimary rounded py-2 px-4 border-inherit  hover:border-colorPrimary"
            onClick={() => signIn()}
          >
            Contact Us
          </button>
          <button
            className="text-colorPrimary hover:bg-colorPrimary hover:text-white 
          rounded py-1 px-4  border-colorPrimary
          font-bold border
          "
          >
            Login / Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionCTA;
