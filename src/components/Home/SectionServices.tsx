"use client"

import Link from "next/link";

const SectionServices = () => {
  return (
    <section className="">
      <div className="max-w-screen-lg relative bottom-10 shadow-sm bg-colorPrimary rounded-lg md:flex justify-center p-8 mx-auto">
        <div className="md:flex text-white flex-col justify-center">
          <h1 className="text-md font-bold">Create an account</h1>
          <p className="text-2xl font-bold">
            An account will get you started
          </p>
        </div>
        <div className="flex justify-center items-center py-8 px-6">
          <Link className="text-white bg-gray-700 rounded-lg p-4 hover:bg-gray-800" href={'/signIn'}>Login</Link>
          <span className="text-bold mx-6 text-white text-4xl">/</span>
          <Link className="text-white bg-blue-700 rounded-lg p-4 hover:bg-blue-950" href={'/register'}>Register</Link>
        </div>
      </div>
    </section>
  );
};

export default SectionServices;
