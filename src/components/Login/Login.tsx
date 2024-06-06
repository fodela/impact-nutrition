// Login.js
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { redirect } from "next/navigation";
import { auth, signIn } from "../../../auth";
import { useSession } from "next-auth/react";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); //
  const {data:session, status} = useSession();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "phone") {
      if (value.trim().length > 10 || value.trim().length < 10) {
        setPhoneError("Phone number must be 10 numbers!");
      } else {
        setPhoneError(null);
      }
    }
    setPhone(value.trim());
  };

  // if (session) {
  //   redirect("/dashboard/subscriber");
  // }
  console.log(session, 'sesion')

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (phoneError) return;
    try {
      setLoading(true); // Start loadin
      const result = await signIn("credentials", {
        phone,
        password,
        redirect: false,
      });
      console.log(result, 'result')
      if (result && result.url) {
        toast.success("Awesome Welcome!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        redirect("/dashboard/subscriber") ;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log('error', error)
      toast.error(`Unable to login! Wrong phone number or password!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false); // Finish loading
    }
  };

  return (
    <div className="max-w-md mx-auto my-auto">
      <h1 className="text-3xl text-center font-bold mb-3">Welcome Back</h1>

      <div className="mb-4">
        <label htmlFor="phone" className="block opacity-50 ">
          Phone
        </label>
        <input
          type="phone"
          name="phone"
          id="phone"
          className={`appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            phoneError && "border-red-600"
          }`}
          placeholder="0240000000"
          value={phone}
          onChange={handleEmailChange}
        />

        <p
          className={`${
            phoneError ? "opacity-100" : "opacity-0"
          } text-red-400 px-3 text-sm text-left`}
        >
          {phoneError}.
        </p>
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block opacity-50  mb-2">
          Password
        </label>
        <div className="flex relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
        <a
          className="underline opacity-50 text-right text-sm mt-4"
          href="/recoverpassword/email"
        >
          Forgot Password
        </a>
      </div>

      <button
        className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={(event) => {
          handleLogin(event);
        }}
      >
        {loading ? "loading" : "Login"}
      </button>
    </div>
  );
};

export default Login;
