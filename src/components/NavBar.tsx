import Link from "next/link";
import SessionButtons from "./SessionButtons";

const NavBar = () => {
  return (
    <ul className="flex gap-4">
      <li>
        <Link href={"/"} className="relative btn-effect">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
        </Link>

      </li>
      <li>
        <Link href="/about" className="relative btn-effect"> About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
        </Link>
      </li>
      <li>
        <Link href="/services" className="relative btn-effect"> Services
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
        </Link>
      </li>
      <li>
        <Link href="/blog" className="relative btn-effect"> Blog
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
        </Link>
      </li>
      <li>
        <Link href="/contact_us" className="relative btn-effect"> Contact us
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
        </Link>
      </li>
      <SessionButtons />
    </ul>
  );
};

export default NavBar;
