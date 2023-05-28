"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      toast.warn(error?.message ? error?.message : "Something Went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-3xl font-bold mb-6">Create a new account</h1>
      <form
        className="w-full max-w-md"
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          rowGap: 10,
        }}
      >
        <label htmlFor="firstname">Firstname</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          name="firstname"
          value={formValues.firstname}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label htmlFor="lastname">lastname</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          name="lastname"
          value={formValues.lastname}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label htmlFor="username">Username</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label htmlFor="date_of_birth">Date of birth</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="date"
          name="date_of_birth"
          value={formValues.date_of_birth}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label htmlFor="email">Email</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label htmlFor="password">Password</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <div className="flex justify-between">
          <button
            className="bg-colorPrimary hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "loading..." : "Register"}
          </button>
          <Link className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href={'/api/auth/signin'}>Login</Link>
        </div>
      </form>

    </div>

  );
};
