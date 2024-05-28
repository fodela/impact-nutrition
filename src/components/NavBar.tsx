"use client";
import Link from "next/link";
import SessionButtons from "./SessionButtons";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import HomeNavBar from "./HomeNavBar";
const NavBar = () => {
  const pathname = usePathname();
  const sidebarRootRef = useRef<HTMLDivElement | null>(null);

  // Define an array of link objects with href and label properties
  // { href: '/services', label: 'Services' },

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    // { href: "/services", label: "Services" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
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
          <AiOutlineMenu className="text-colorPrimary" size={28} />
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
     <HomeNavBar />
    </div>
  );
};

export default NavBar;
