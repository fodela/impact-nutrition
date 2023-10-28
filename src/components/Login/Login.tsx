// Login.js
'use client'
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import {  toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { redirect } from "next/navigation";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); //
    const {data: session, status} = useSession()

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

    if(session){
        redirect('/dashboard')
    }

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
                window.location.href = "/dashboard";
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
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
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                    Phone
                </label>
                <input
                    type="phone"
                    name="phone"
                    id="phone"
                    className={`appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${phoneError && "border-red-600"}`}
                    placeholder="Phone"
                    value={phone}
                    onChange={handleEmailChange}
                />
                {phoneError && <div className="text-red-400 px-3">{phoneError}</div>}
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
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
                        {showPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
                    </button>
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={(event) => {
                        handleLogin(event);
                    }}
                >
                    {loading ? "loading" : "Login"} 
                </button>
                <a className="underline font-bold" href="/recoverpassword/email">
                    Forgot Password
                </a>
            </div>
        </div>
    );
};

export default Login;
