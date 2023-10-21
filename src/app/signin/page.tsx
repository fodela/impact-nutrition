"use client"
import Login from "@/components/Login/Login";
import { RegisterForm } from "@/components/form";

import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const LoginForm = () => {
    const [showSignin, setShowSignIn] = useState(true);

    // ... Rest of your code

    return (
        <div className="h-full my-6">
            <div className="flex justify-center my-8">
                <button
                    className="underline border-1 rounded-md text-lg font-bold px-4 py-2"
                    onClick={() => setShowSignIn(!showSignin)}
                >
                    {showSignin ? <>Register</> : <>Log In</>}
                </button>
            </div>
            {showSignin ? (
                <>
                    {/* ... Your login logic is now encapsulated in the Login component */}
                    <Login />
                </>
            ) : (
                <>
                    <RegisterForm />
                </>)
            }
        </div>
    );
};

export default LoginForm;
