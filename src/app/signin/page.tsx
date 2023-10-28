"use client"
import Login from "@/components/Login/Login";
import { RegisterForm } from "@/components/form";

import { useState } from "react";

import "react-toastify/ReactToastify.min.css";

const LoginForm = () => {
    const [showSignin, setShowSignIn] = useState(true);

    return (
        <div className="my-6">
            <div>content</div>
            <div className="flex justify-center my-8">
                <button
                    className="underline border-1 rounded-md text-lg font-bold px-4 py-2"
                    onClick={() => setShowSignIn(!showSignin)}
                >
                    {showSignin ? <div>Register</div> : <div>Log In</div>}
                </button>
            </div>
            {showSignin ? (
                <>
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
