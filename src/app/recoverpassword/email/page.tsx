'use client'
import { RegisterForm } from "@/components/form";
import sendSms from "@/components/sms/sendSms";
import { resetUserPassword } from "@/lib/resetUserPassword";
import axios, { Axios } from "axios";
import { NextApiResponse } from "next";
import { signIn, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { NextResponse } from "next/server";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const LoginForm = () => {
   const [formData, setFormData] = useState({
    phone: "",
    password: "",
    token: "",
    verifyPassword: ""
   })
    const [moveToPassword, setMoveToPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const handleFormChange = ((e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]:value})
   })

    const requestToken = async (phone: string) => {
        await axios.post("/api/recover_email_password/requestToken",{
            phone
        }).then((res) => {
            toast.success(`We sent you an email with your a token to use to reset your password`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            res && setMoveToPassword(true)
        }).catch((error) => {
            toast.error(error?.response?.data?.message ? `Unable to login! Wrong phone number` : "Something Went wrong!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
    }


    const handleLogin = async (e: any) => {
     e.preventDefault()
     
        try {
            const result = await  resetUserPassword(formData.token, formData.password, formData.verifyPassword)
            if (result) {
                toast.success("Awesome Now use that password to login!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                window.location.href = "/signin";
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error: any) {
            toast.error(`Unable to reset! ${error?.response.data.message}`, {
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
        <div className="h-full my-6">
            <form className="max-w-md mx-auto my-auto">
                <a href="/signin" className="font-bold underline">Login</a>
                <h1 className="text-3xl text-center font-bold mb-6">Recover Your Password</h1>
                {!moveToPassword ? <>
                    <div className="mb-4">
                        <label htmlFor="phone" className="blockfont-bold mb-2">
                            Phone
                        </label>
                        <input
                            type="phone"
                            name="phone"
                            id="phone"
                            className={`appearance-none my-4 border text-gray-900 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${phoneError && "border-red-600"}`}
                            placeholder="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                        />
                        {phoneError && <div className="text-red-400 px-3">{phoneError}</div>}
                    </div>

                    <div className="flex justify-between">
                        <button
                            className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => {
                                if (phoneError) {
                                    toast.error(`Wrong Phone number`, {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    });
                                    return
                                } else {
                                    const reqToken = requestToken(formData.phone)
                                }
                            }}
                        >
                            Next
                        </button>
                    </div>
                </> : <>
                    <div>
                            <div className="mb-4">
                                <label htmlFor="token" className="blockfont-bold mb-2">
                                    Enter the token sent to you via Email
                                </label>
                                <input
                                    type="text"
                                    name="token"
                                    id="token"
                                    className={`appearance-none my-4 border text-gray-900 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                                    placeholder="Token"
                                    value={formData.token}
                                    onChange={handleFormChange}
                                />
                               
                            </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="blockfont-bold mb-2">
                                Password
                            </label>
                            <div className="flex relative">
                                <input type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ${formData.password !== formData.verifyPassword && "border-red-600"}`}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleFormChange}
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
                            <div className="mb-6">
                            <label htmlFor="verifyPassword" className="blockfont-bold mb-2">
                                Verify Password
                            </label>
                            <div className="flex relative">
                                <input type={showPassword ? 'text' : 'password'}
                                    name="verifyPassword"
                                    id="verifyPassword"
                                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ${formData.password !== formData.verifyPassword && "border-red-600"}`}
                                    placeholder="Password"
                                    value={formData.verifyPassword}
                                    onChange={handleFormChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-700 ml-2 absolute right-2 h-full focus:outline-none"
                                >
                                    {showPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
                                </button>
                            </div>
                            {formData.password !== formData.verifyPassword && <div className="text-red-900 font-bold -text-2xl">Password check your passwords</div>} 
                        </div>
                        <div className="flex justify-between">
                            <button
                            disabled={formData.password !== formData.verifyPassword}
                                className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                onClick={(event) => {
                                    handleLogin(event);
                                }}
                            >
                                Update Password
                            </button>

                            <button
                                className="underline hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                onClick={(event) => {
                                    setShowPassword(false)
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </>}
            </form>
        </div>
    );
};

export default LoginForm;
