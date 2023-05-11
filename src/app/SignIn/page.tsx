'use client'
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    const { data: session } = useSession()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: any) => {
        // TODO: Implement login functionality  
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });
            if (result && result.url) {
                setError('');
                window.location.href = '/dashboard';
            } else {
                setError('Unable to login, Incorrect email or password.')
            }


        } catch (error) {
            console.log(error, 'error')
            setError('Something went wrong')
        }

    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            {error.length > 0 && <div className="p-4 bg-red-700 text-white font-bold rounded-xl">{error}</div>}
            <form className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={(event) => {
                            handleLogin(event)
                        }}
                    >
                        Login
                    </button>
                    <Link className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href={'/register'}>Register</Link>
                </div>

            </form>
        </div>
    );
};

export default LoginForm;
