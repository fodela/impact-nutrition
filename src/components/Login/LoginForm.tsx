"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/app/redux/store";
import { login } from "@/app/redux/slices/authSlice";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: RootState) => state.auth.status);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const phone = formData.get("phone")?.toString() || '';
    const password = formData.get("password")?.toString() || '';
    setLoading(true);

    try {
      await dispatch(login({ phone, password })).unwrap();
      setLoading(false);
      toast.success("You have successfully logged in!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/dashboard/subscriber");
    } catch (error) {
      setLoading(false);
      toast.error("Username or Password error!", {
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
    <div className="max-w-md mx-auto my-auto">
      <h1 className="text-3xl text-center font-bold mb-3">Welcome Back</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
        <label htmlFor="phone" className="block opacity-50">
          Phone
        </label>
        <input
          type="phone"
          name="phone"
          id="phone"
          className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="0240000000"
        />
        <div className="mb-6">
          <label htmlFor="password" className="block opacity-50 mb-2">
            Password
          </label>
          <div className="flex relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-700 ml-2 absolute right-2 h-full focus:outline-none"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={30} />
              ) : (
                <AiFillEye size={30} />
              )}
            </button>
          </div>
          <a className="underline opacity-50 text-right text-sm mt-4" href="/recoverpassword/email">
            Forgot Password
          </a>
        </div>
        <button
          className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
