"use client"
import Link from "next/link";

import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im";
import { BsEnvelopeFill } from "react-icons/bs";
import Logo from "../Logo";

const FooterColOne = () => {
  return (
    <div className="md:flex p-4 flex-col gap-6 ">
      <Logo />
      <div className="text-xl p-4 font-bold md:flex md:flex-col">
        <p className="py-4">info@nutritionconsultgh.com</p>
        <p className="py-4">Address line 1, address line 2</p>
      </div>
      <div className="flex flex-col justify-center items-center border-t-2 border-t-black md:border-t-0">
        <p className="text-xl font-bold pt-4">Follow us:</p>
        <div className="flex gap-4 pt-2">
          <div className="shadow-md rounded-full p-4">
            <Link href="/">
              <ImFacebook className="rounded-full" size={30} />
            </Link>
          </div>

          <span className="shadow-md rounded-full p-4">
            <Link href="/">
              <ImLinkedin2 className="rounded-full" size={30} />
            </Link>
          </span>

          <div className="shadow-md rounded-full p-4">
            <Link href="/">
              <ImTwitter className="rounded-full" size={30} />
            </Link>
          </div>

          <div className="shadow-md rounded-full p-4">
            <Link href="/">
              <BsEnvelopeFill className="rounded-full" size={30} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterColOne;
