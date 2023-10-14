'use client'
import { signIn, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const LoginForm = () => {
    const [phone, setPhone] = useState("");
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
        setPhone(e.target.value.trim());
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                phone,
                password,
                redirect: false,
            });
            if (result && result.url) {
                toast.success('Awesome Welcome!', {
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
        }

    };
    // <div className="flex justify-center items-center">
    //     <button className="shadow-md font-bold p-4 rounded-md" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>Sign in with Google</button> */}
    //     {providers.map((provider) => (
    //         <button
    //             key={provider.id}
    //             onClick={() => signIn(provider.id, { callbackUrl: "/" })}
    //         >
    //             Sign in with {provider.name}
    //         </button>
    //     ))}
    // </div>
    return (
        <div className="h-full my-6">
            <h1 className="text-3xl text-center font-bold mb-6">Login</h1>
           
            <form className="max-w-md mx-auto my-auto"> 
            <div className="py-6 font-bold px-4">
                <Link
                    className="rounded hover:outline-none hover:shadow-outline"
                    href={'/register'}
                >
                    Register
                </Link>
            </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                        Phone
                    </label>
                    <input
                        type="phone"
                        id="phone"
                        className="appearance-none border rounded w-full min-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="phone"
                        value={phone}
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
                </div>
            </form>

        </div>
    );
};

export default LoginForm;
