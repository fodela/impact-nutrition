'use client'
import { signIn, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [providers, setProviders] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const setProvidr = async () => {
            const providerData = await getProviders();
        }
        // setProviders(setProvidr);
    }, [providers, setProviders]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (result && result.url) {
                toast.success('Awesome! Welcome!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                window.location.href = '/dashboard';
            } else {
                toast.error('Unable to login, Incorrect email or password.', {
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


        } catch (error) {
            toast.error('Something went wrong.', {
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
        <div className="h-full">
            <h1 className="text-3xl text-center font-bold mb-6">Login</h1>
            <div>
                {/* <button onClick={() => signIn("google")}>Sign in with Google</button> */}
                {/* {providers.map((provider) => (
                    <button
                        key={provider.id}
                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    >
                        Sign in with {provider.name}
                    </button>
                ))} */}
            </div>
            <form className="max-w-md mx-auto my-auto">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="appearance-none border rounded w-full min-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <div className="flex relative">
                        <input type={showPassword ? 'text' : 'password'}
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
                        Login
                    </button>
                    <Link
                        className="bg-colorPrimary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        href={'/register'}
                    >
                        Register
                    </Link>
                </div>
            </form>

        </div>
    );
};

export default LoginForm;
