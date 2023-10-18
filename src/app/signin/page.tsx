'use client'
import { RegisterForm } from "@/components/form";
import sendSms from "@/components/sms/sendSms";
import { signIn, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const LoginForm = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showSignin, setShowSignIn] = useState(true)
    const [providers, setProviders] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const sendnewSms = () => {
        let res = sendSms("+233200784008", "Impact Nutrition", "Here is how to send an sms")
        console.log(res,'res')
    }

    useEffect(() => {
        const setProvidr = async () => {
            const providerData = await getProviders();
        }
        // setProviders(setProvidr);
    }, [providers, setProviders]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }=e.target
        if (name === 'phone') {
            // Check the phone number length
            if (value.trim().length > 11 || value.trim().length < 10) {
                setPhoneError('Phone number must be 10 numbers!');
            } else {
                setPhoneError(null);
            }
        }
        setPhone(value.trim());
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (phoneError) return
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
    console.log(phoneError, 'phonerror')
    return (
        <div className="h-full my-6">
            {/* <div className="flex justify-center my-8">
                <button className="underline border-1 rounded-md text-lg font-bold px-4 py-2" onClick={() => setShowSignIn(!showSignin)}> {showSignin ? <>Register</> : <>Log In</>} </button>
            </div> */}
            {showSignin ? <>
                <button onClick={sendnewSms}>Send sms</button>
                <h1 className="text-3xl text-center font-bold mb-6">Login</h1>

                <form className="max-w-md mx-auto my-auto">
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                            Phone
                        </label>
                        <input
                            type="phone"
                            name="phone"
                            id="phone"
                            className={`appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!phoneError && "border-red-600"}`}
                            placeholder="phone"
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
            </> : <>
            <RegisterForm />
            </>}
        </div>
    );
};

export default LoginForm;
