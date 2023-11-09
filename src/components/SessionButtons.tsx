"use client";
import { setSession } from "@/app/redux/actions/sessionAction";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiLeftArrow, BiUserCircle } from "react-icons/bi";
import { FiChevronDown, FiUser } from "react-icons/fi";
// import { LuLayoutPanelLeft } from "react-icons/lu";

export default function SessionButtons() {
  const { data: session, status } = useSession();

  const {sessionStatus, currentSession} = useAppSelector(state => state.session)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status === "unauthenticated" && sessionStatus !== status) {
      dispatch(setSession({ session, sessionStatus: status }));
    } else if (status === "authenticated") {
      if (currentSession != session) {
        dispatch(setSession({ session, sessionStatus: status }));
      }
    }
  }, [currentSession, dispatch, session, sessionStatus, status]);
  
  const [showAction, setShowAction] = useState(false);

  const authRef = useRef<HTMLDialogElement>(null);

  if (currentSession) {
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
          <div className="absolute flex flex-col justify-center items-center gap-4 w-48 mx-2 mt-3 p-8 right-6 rounded-xl shadow-md px-4 py-2 bg-white/80 dark:bg-white/10  revealFromTop">
            <ul onClick={() => setShowAction(false)}>
              <li className="mb-1 font-bold relative">
                <Link className="btn-effect" href="/dashboard">
                  {" "}
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
                </Link>
              </li>
              <li>
                <Link
                  className="btn-effect flex items-center gap-2"
                  href="/dashboard"
                >
                  {" "}
                  {/* <LuLayoutPanelLeft /> */}
                  <BiLeftArrow />
                  Go to Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
                </Link>
              </li>

              <li>
                <Link
                  className="btn-effect flex items-center gap-2"
                  href="/dashboard/profile"
                >
                  {/* <LuLayoutPanelLeft /> */}
                  <BiUserCircle />
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
                </Link>
              </li>              
            </ul>
            <button
              className="bg-colorPrimary hover:bg-colorPrimary-200 px-4 py-1 rounded text-white transition-colors duration-1200 w-24"
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
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
