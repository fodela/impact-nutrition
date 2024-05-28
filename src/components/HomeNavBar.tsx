// HomeNavBar.js
"use client";
import Link from "next/link";
import SessionButtons from "./SessionButtons";
import {usePathname} from "next/navigation";
import DashboardNav from "@/app/dashboard/DashboardNav";

const HomeNavBar = () => {
    const pathname = usePathname();

    const links = [
        {
            href: "/",
            label: "Home"
        },
        {
            href: "/blog",
            label: "Blog"
        },
        {
            href: "/events",
            label: "Events"
        },
        {
            href: "/about",
            label: "About"
        }, {
            href: "/contact_us",
            label: "Contact Us"
        },
    ];
    {
        if (pathname.includes("admin")) {
            return <DashboardNav />
        }
    }
    return (<div className="hidden md:block">
        <ul className="flex justify-center items-center gap-3"> {
            links.map(({href, label}) => (<li key={href}>
                <Link href={href}
                    legacyBehavior>
                    <a className={
                        `relative btn-effect uppercase ${
                            pathname === href ? "active text-colorPrimary font-bold" : ""
                        }`
                    }> {label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 opacity-0"></span>
                    </a>
                </Link>
            </li>))
        }
            <SessionButtons/>
        </ul>
    </div>);
};

export default HomeNavBar;
