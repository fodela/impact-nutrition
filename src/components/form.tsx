"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showverifyPass, setshowverifyPass] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  let [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    professional_pin: "",
    email: "",
    password: "",
    verifyPass: ""
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formValues, 'formbalues')
      const res = await axios.post("/api/register", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (res.status !== 200) {
        const result = res.data;
        console.log(res.data, 'data')
        toast.error(`Something went wrong! ${res.data}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      toast.success("Registration is successful. Verify your email!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const {phone , password} = formValues;
      signIn('credentials', {
        phone, 
        password, 
        callbackUrl: "/dashboard" // Redirect URL after successful login
      })
    } catch (error: any) {
      setLoading(false);
      console.log(error, 'error')
      toast.error("Registration failed! Is there a chance you have already used that phone number to register?", {
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

    setFormValues((prevFormValues) => {
      const updatedFormValues = { ...prevFormValues, [name]: value.trim() };

      if (name === 'password' || name === 'verifyPass') {
        setPasswordMatch(
          updatedFormValues.password === updatedFormValues.verifyPass
        );
      }

      return updatedFormValues;
    });
  };



  return (
    <div className="flex my-8 flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Create a new account</h1>
      <form
        className="max-w-md shadow-md m-4 p-6"
        onSubmit={onSubmit}
      >
        <label className="font-bold" htmlFor="firstname">Firstname</label>
        <input
          className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          name="firstname"
          value={formValues.firstname}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label className="font-bold" htmlFor="lastname">Lastname</label>
        <input
          className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          name="lastname"
          value={formValues.lastname}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label className="font-bold" htmlFor="phone">Phone</label>
        <input
          className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="phone"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label className="font-bold" htmlFor="professional_pin">Professional Pin</label>
        <input
          className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          name="professional_pin"
          value={formValues.professional_pin}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        <label className="font-bold" htmlFor="email">Email</label>
        <input
          className={`appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />

        <label htmlFor="password">Password</label>
        <div className="flex relative">
          <input
            className={`appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!passwordMatch && "border-red-600"}`}
            required
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formValues.password}
            onChange={handleChange}
            style={{ padding: "1rem" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-700 ml-2 absolute right-2 h-full focus:outline-none"
          >
            {showPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
          </button>
        </div>

        <label htmlFor="verifyPass">Confirm Password</label>
        <div className="flex relative">
          <input
            className={`appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!passwordMatch && "border-red-600"}`}
            required
            type={showverifyPass ? 'text' : 'password'}
            name="verifyPass"
            value={formValues.verifyPass}
            onChange={handleChange}
            style={{ padding: "1rem" }}
          />

          <button
            type="button"
            onClick={() => setshowverifyPass(!showverifyPass)}
            className="text-gray-700 ml-2 absolute right-2 h-full focus:outline-none"
          >
            {showverifyPass ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
          </button>
        </div>

        <div className="flex my-6 justify-between">
          <button
            className="bg-colorPrimary hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || !passwordMatch}
          >
            {loading ? "Loading..." : "Register"}
          </button>

          <Link className="border-b border-b-green-600 font-bold py-2 px-4 rounded focus:outline-none hover:shadow-outline" href={'/api/auth/signin'}>Login</Link>
        </div>
      </form>

    </div>

  );
};
