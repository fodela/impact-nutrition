"use client";
import Link from "next/link";
import SessionButtons from "./SessionButtons";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
const NavBar = () => {
  const pathname = usePathname();
  const sidebarRootRef = useRef<HTMLDivElement | null>(null);

  // Define an array of link objects with href and label properties
  // { href: '/services', label: 'Services' },

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blogs" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About Us" },
    { href: "/contact_us", label: "Contact Us" },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  return (
    <div>
      <header className="flex justify-between md:hidden">
        <button className="pr-4 dark:text-white" onClick={toggleSidebar}>
          <AiOutlineMenu className="dark:text-white" size={30} />
        </button>
      </header>
      <div ref={sidebarRootRef} id="sidebar-root" />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          toggleSidebar();
        }}
        sidebarRoot={sidebarRootRef.current}
      />
      <div className="hidden md:block">
        <ul className="flex justify-center text-xl items-center gap-3">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} legacyBehavior>
                <a
                  className={` relative btn-effect ${
                    pathname === href ? "active text-colorPrimary" : ""
                  }`}
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
                </a>
              </Link>
            </li>
          ))}
          <SessionButtons />
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
