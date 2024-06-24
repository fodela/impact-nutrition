'use client' 
import {BiMessageRoundedDetail, BiUser} from "react-icons/bi"
import {BsDashSquare} from "react-icons/bs"
import {CiCalendar} from "react-icons/ci"
import {usePathname} from 'next/navigation'
import { signOutTo } from "@/components/Login/signOUtAction"

const DashboardNav = () => {
const pathname = usePathname()
    const navItems = [
        {
            path: "/dashboard/admin/reports",
            label: "Dashboard",
            icon: <BsDashSquare size={25}/>
        }, {
            path: "/dashboard/admin/users",
            label: "Users",
            icon: <BiUser size={25}/>
        }, {
            path: "/dashboard/admin/events",
            label: "Events",
            icon: <CiCalendar size={25}/>
        }, {
            path: "/dashboard/admin/posts",
            label: "Posts",
            icon: <BiMessageRoundedDetail size={25}/>
        },
    ];

    return (
        <nav className="bg-white rounded-xl py-4 mb-4 w-fit dark:bg-white/10">
            <ul className="flex gap-8 px-4 justify-start">
                {
                navItems.map((item) => (
                    <li key={
                        item.path
                    }>
                        <a href={
                                item.path
                            }
                            className={
                                `font-bold px-2 lg:px-4 flex gap-2 items-center ${
                                    pathname === item.path ? 'text-blue-500' : 'text-[#b7b7b7]'
                                }`
                        }>
                            {
                            item.icon
                        }
                            {
                            item.label
                        } </a>
                    </li>
                ))
            } 
            <button
              className="bg-colorPrimary hover:bg-colorPrimary-200 px-4 py-1 rounded text-white transition-colors duration-1200 w-24"
              onClick={() => signOutTo("/")}
            >
              Sign out
            </button>
            </ul>
        </nav>
    );
}

export default DashboardNav;

