"use client";
import Login from "@/components/Login/LoginForm";
import { RegisterForm } from "@/components/form";
import Image from "next/image";

import { useState } from "react";

import "react-toastify/ReactToastify.min.css";

const Page = () => {
  const [showSignin, setShowSignIn] = useState(true);

  return (
    <div className="grid md:grid-cols-2 mx-auto max-w-screen-xl">
      <div
        className={`hidden md:block ${
          showSignin
            ? " bg-[url('https://images.unsplash.com/photo-1612831198717-1e71a0d5e2ad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
            : " bg-[url('https://images.unsplash.com/photo-1642929426263-caf1617ced29?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
        } bg-no-repeat bg-center bg-cover`}
      />
      <div
        className={`md:bg-none ${
          showSignin
            ? " bg-[url('https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
            : " bg-[url('https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
        } bg-no-repeat bg-center bg-cover`}
      >
        <div className="my-24 w-fit p-2 sm:p-8 bg-white dark:bg-neutral-800 dark:border rounded-lg mx-auto shadow ">
          <div className="grid grid-cols-2 gap-2 mb-8">
            <button
              className={`p-2 ${
                !showSignin && "bg-neutral-500 opacity-70"
              } rounded-t-lg text-xl font-bold capitalize`}
              onClick={() => setShowSignIn(true)}
            >
              Login
            </button>
            <button
              className={`p-2 ${
                showSignin && "bg-neutral-500 opacity-70"
              } rounded-t-lg text-xl font-bold capitalize`}
              onClick={() => setShowSignIn(false)}
            >
              register
            </button>
          </div>
          <Image
            src="/assets/svg/favicon.svg"
            width={60}
            height={60}
            alt="logo icon"
            className="mx-auto "
          />

          {showSignin ? (
            <>
              <Login />
            </>
          ) : (
            <>
              <RegisterForm />
            </>
          )}
          <button
            className="text-center hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setShowSignIn(!showSignin)}
          >
            {showSignin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
