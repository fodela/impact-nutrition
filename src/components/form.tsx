"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export const RegisterForm = () => {
  const [phoneError, setPhoneError] = useState<string | null>(null);
  let [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showverifyPass, setshowverifyPass] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  let [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    profession: "",
    professional_pin: "",
    email: "",
    password: "",
    verifyPass: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (phoneError) return;
    try {
      const res = await axios.post("/api/register", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (res.status !== 200) {
        const result = res.data;
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
      const { phone, password } = formValues;
      signIn("credentials", {
        phone,
        password,
        callbackUrl: "/dashboard", // Redirect URL after successful login
      });
    } catch (error: any) {
      setLoading(false);
      toast.error(
        "Registration failed! Is there a chance you have already used that phone number to register?",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "phone") {
      // Check the phone number length
      if (value.trim().length > 11 || value.trim().length < 10) {
        setPhoneError("Phone number must be 10 numbers!");
      } else {
        setPhoneError(null);
      }
    }

    setFormValues((prevFormValues) => {
      const updatedFormValues = { ...prevFormValues, [name]: value };

      if (name === "password" || name === "verifyPass") {
        setPasswordMatch(
          updatedFormValues.password === updatedFormValues.verifyPass
        );
      }

      return updatedFormValues;
    });
  };

  return (
    <div className="w-fit">
      <h1 className="text-3xl text-center font-bold">Create a new account</h1>
      <form className="m-4 p-6 signup" onSubmit={onSubmit}>
        <div className="">
          {" "}
          <label className="opacity-50" htmlFor="firstname">
            Firstname
          </label>

      
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
            className={`appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${phoneError && "border-red-600"}`}
          required
          type="phone"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          style={{ padding: "1rem" }}
        />
        {phoneError &&  <div className="text-red-400 px-3">{phoneError}</div>}

          <label className="font-bold" htmlFor="profession">Profession</label>
          <input
            className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            type="text"
            name="profession"
            value={formValues.profession}
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
            className=""
            required
            type="text"
            name="firstname"
            value={formValues.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className="opacity-50" htmlFor="lastname">
            Lastname
          </label>
          <input
            className=""
            required
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className="opacity-50" htmlFor="phone">
            Phone
          </label>
          <input
            className={` ${phoneError && "border-red-600"}`}
            required
            type="phone"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
          />
          <div
            className={`${
              phoneError ? "opacity-100" : "opacity-0"
            } text-red-400 px-3 text-sm text-left`}
          >
            {phoneError}
          </div>
        </div>

        <div className="">
          <label className="opacity-50" htmlFor="professional_pin">
            Professional Pin
          </label>
          <input
            className=""
            required
            type="text"
            name="professional_pin"
            value={formValues.professional_pin}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <label className="opacity-50" htmlFor="email">
            Email
          </label>
          <input
            className=""
            required
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label htmlFor="password">Password</label>
          <div className="flex relative">
            <input
              className={` ${!passwordMatch && "border-red-600"}`}
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleChange}
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
        </div>

        <div className="">
          <label htmlFor="verifyPass">Confirm Password</label>
          <div className="flex relative">
            <input
              className={` ${!passwordMatch && "border-red-600"}`}
              required
              type={showverifyPass ? "text" : "password"}
              name="verifyPass"
              value={formValues.verifyPass}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setshowverifyPass(!showverifyPass)}
              className="text-gray-700 ml-2 absolute right-2 h-full focus:outline-none"
            >
              {showverifyPass ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
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
