'use client'
import { signIn, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    const { data: session } = useSession()
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const setProvidr = async () => {
            const providerData = await getProviders();
        }
        console.log(setProvidr, 'provdier')
        // setProviders(setProvidr);
    }, [providers, setProviders]);

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
                redirect: false,
            });
            if (result && result.url) {
                setError('');
                window.location.href = '/dashboard';
            } else {
                setError('Unable to login, Incorrect email or password.')
            }


        } catch (error) {
            setError('Something went wrong')
        }

    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Login</h1>

            {error.length > 0 && <div className="p-4 bg-red-700 text-white font-bold rounded-xl">{error}</div>}

            <div>
                <button onClick={() => signIn("google")}>Sign in with Google</button>
                {/* {providers.map((provider) => (
                    <button
                        key={provider.id}
                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    >
                        Sign in with {provider.name}
                    </button>
                ))} */}
            </div>
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

// import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
// import { getProviders, signIn } from "next-auth/react"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../api/auth/[...nextauth]/route";

// export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     return (
//         <>
//             {Object.values(providers).map((provider) => (
//                 <div key={provider.name}>
//                     <button onClick={() => signIn(provider.id)}>
//                         Sign in with {provider.name}
//                     </button>
//                 </div>
//             ))}
//         </>
//     )
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const session = await getServerSession(context.req, context.res, authOptions);

//     // If the user is already logged in, redirect.
//     // Note: Make sure not to redirect to the same page
//     // To avoid an infinite loop!
//     if (session) {
//         return { redirect: { destination: "/" } };
//     }

//     const providers = await getProviders();

//     return {
//         props: { providers: providers ?? [] },
//     }
// }
