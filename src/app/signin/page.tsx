"use client";
import Login from "@/components/Login/Login";
import { RegisterForm } from "@/components/form";
import Image from "next/image";

import { useState } from "react";

import "react-toastify/ReactToastify.min.css";

const LoginForm = () => {
  const [showSignin, setShowSignIn] = useState(true);

  return (
    <div className="my-24 w-fit p-2 sm:p-8 bg-white dark:bg-inherit dark:border rounded-lg mx-auto shadow">
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
        className="text-sm px-4 py-2 mx-auto w-full"
        onClick={() => setShowSignIn(!showSignin)}
      >
        {showSignin ? (
          <div>
            Don't have an account?{" "}
            <span className="text-blue-500 underline font-bold">Signup</span>
          </div>
        ) : (
          <div>
            Already have an account?{" "}
            <span className="text-blue-500 underline font-bold">Login</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default LoginForm;
