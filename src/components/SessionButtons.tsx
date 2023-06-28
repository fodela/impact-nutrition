"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FiChevronDown, FiUser } from "react-icons/fi";
export default function SessionButtons() {
  const { data: session } = useSession();
  const [showAction, setShowAction] = useState(false);

  const authRef = useRef<HTMLDialogElement>(null);
  if (session) {
    return (
      <div className="relative ">
        <div className="link flex justify-center items-center font-bold cursor-pointer">
          <div className="flex rounded-full h-8 w-8 justify-center items-center bg-slate-200">
            <FiUser />
          </div>
          <span className="show" onClick={() => setShowAction(!showAction)}>
            <FiChevronDown />
          </span>
        </div>
        {showAction && (
          <div className="absolute  w-48 mx-2 mt-3 right-6 rounded-xl shadow-md px-4 py-2 bg-white/80 dark:bg-black/80  revealFromTop">
            <ul>
              <li className="mb-1 font-bold relative">
                <Link className="btn-effect" href="/dashboard">
                  {" "}
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
                </Link>
              </li>
              <li className="mb-1 font-bold relative">
                <Link className="btn-effect" href="/dashboard">
                  {" "}
                  Create Post
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
                </Link>
              </li>
              <li className="mb-1 font-bold relative">
                <Link className="btn-effect" href="/dashboard">
                  {" "}
                  Add CPD event
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
                </Link>
              </li>
            </ul>
            <button
              className="bg-colorPrimary hover:bg-green-900 px-4 py-1 ml-4rounded text-white transition-colors duration-1200"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        className="bg-colorPrimary hover:bg-colorPrimary-200 px-4 py-1 ml-4 rounded text-white transition-colors duration-1200 "
        onClick={() => console.log(authRef)}
      >
        Sign in
      </button>
    </>
  );
}
