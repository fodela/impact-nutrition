'use client'
import Link from "next/link";
import SessionButtons from "./SessionButtons";
import { usePathname } from 'next/navigation';
const NavBar = () => {
  const pathname = usePathname();

  // Define an array of link objects with href and label properties
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact_us', label: 'Contact Us' },
  ];

  return (
    <ul className="flex justify-center items-center gap-4">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} legacyBehavior>
            <a className={`font-bold relative btn-effect ${pathname === href ? 'active' : ''}`}>
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
            </a>
          </Link>

        </li>
      ))}
      <SessionButtons />
    </ul>
  );
};

export default NavBar;
