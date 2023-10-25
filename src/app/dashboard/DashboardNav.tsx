'use client'

import { BiMessageRoundedDetail, BiUser } from "react-icons/bi"
import { BsDashSquare, BsPostcard } from "react-icons/bs"
import { CiCalendar } from "react-icons/ci"

const DashboardNav = () => {
  return (
    <nav className="bg-white rounded-xl py-4 mb-8 w-fit dark:bg-white/10">
      <ul className="flex gap-8 px-4  justify-start text-[#b7b7b7]  ">
        <li>
          <a href="/dashboard/admin/" className="font-bold px-2 lg:px-4  flex gap-2 items-center "><BsDashSquare size={25} /> Dashboard</a>
        </li>
        <li>
          <a href="/dashboard/admin/users" className="font-bold px-2 lg:px-4  flex gap-2 items-center "><BiUser size={25} /> Users</a>
        </li>
        <li>
          <a href="/dashboard/admin/events" className="font-bold px-2 lg:px-4  flex gap-2 items-center "><CiCalendar size={25} /> Events</a>
        </li>
        <li>
          <a href="/dashboard/admin/posts" className="font-bold px-2 lg:px-4  flex gap-2 items-center "><BiMessageRoundedDetail size={25} />  Posts</a>
        </li>
      </ul>
    </nav>
  )
}

export default DashboardNav