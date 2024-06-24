"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/ReactToastify.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { login } from "@/app/redux/slices/authSlice";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPass, setShowVerifyPass] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const firstname = formData.get("firstname")?.toString().trim();
    const lastname = formData.get("lastname")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const profession = formData.get("profession")?.toString().trim();
    const professional_pin = formData.get("professional_pin")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const verifyPass = formData.get("verifyPass")?.toString().trim();

    if (!firstname || !lastname || !phone || !password || !verifyPass) {
      toast.error("Please fill in all required fields.", {
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

    if (password !== verifyPass) {
      setPasswordMatch(false);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", {
        firstname,
        lastname,
        phone,
        profession,
        professional_pin,
        email,
        password,
      });

      if (res.status !== 201) {
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
        setLoading(false);
        return;
      }

      toast.success("Registration is successful. Redirecting to dashboard", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  await dispatch(login({ phone, password })).unwrap();
      router.push("/dashboard/profile");
    } catch (error: any) {
      setLoading(false);
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

  return (
    <div className="w-fit">
      <h1 className="text-3xl text-center font-bold">Create a new account</h1>
      <form className="m-4 p-6 signup" onSubmit={handleSubmit}>
        <div>
          <label className="opacity-50" htmlFor="firstname">
            Firstname
          </label>
          <input
            required
            type="text"
            name="firstname"
            id="firstname"
            className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="opacity-50" htmlFor="lastname">
            Lastname
          </label>
          <input
            required
            type="text"
            name="lastname"
            id="lastname"
            className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="opacity-50" htmlFor="phone">
            Phone
          </label>
          <input
            required
            type="phone"
            name="phone"
            id="phone"
            className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="opacity-50" htmlFor="professional_pin">
            Professional Pin
          </label>
          <input
            required
            type="text"
            name="professional_pin"
            id="professional_pin"
            className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="opacity-50" htmlFor="email">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="opacity-50" htmlFor="profession">
            Profession
          </label>
          <input
            type="text"
            name="profession"
            id="profession"
            className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className="flex relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-700 ml-2 absolute right-2 h-full focus:outline-none"
            >
              {showPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="verifyPass">Confirm Password</label>
          <div className="flex relative">
            <input
              required
              type={showVerifyPass ? "text" : "password"}
              name="verifyPass"
              id="verifyPass"
              className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => setShowVerifyPass(!showVerifyPass)}
              className="text-gray-700 ml-2 absolute right-2 h-full focus:outline-none"
            >
              {showVerifyPass ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
            </button>
          </div>
        </div>
        <div className="flex mt-3 justify-between">
          <button
            className="bg-colorPrimary hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || !passwordMatch}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};
