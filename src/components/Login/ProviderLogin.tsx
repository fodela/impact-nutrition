"use client";

import {signIn} from "next-auth/react";
import {FaGoogle} from "react-icons/fa";

const ProviderLogin = () => {
    return (
        <div className="my-4">
            <h2>Login with </h2>
            <div className="my-4">
                <button className="bg-green-800 rounded-md p-2 m-1"
                    onClick={
                        async () => {
                            await signIn("google", {callbackUrl: "/dashboard/profile"});
                        }
                }>
                    <FaGoogle/>
                </button>
            </div>

        </div>
    );
};

export default ProviderLogin;
