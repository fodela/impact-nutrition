'use client'
import { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { verifyUserRole } from "@/lib/verifyUserRole";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const DashboardNav = () => {
  const [tabs] = useState(['Dashboard', 'Posts', 'Events']);

  const pathname = usePathname();
  const { data: session, status } = useSession()
  console.log('running')
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated" && !session) {
    redirect("/api/auth/signin");
  }

  if (!session) {
    redirect("/api/auth/signin");
  }
  //@ts-ignore
  const role = session.user.role;
  return (
    <nav>
      <ul className="flex px-4 mx-4 justify-start">
        <li><Link className={`px-2 lg:px-4 font-bold  ${pathname === `/dashboard` ? "border-b-2 dark:border-white border-black" : ""}`} href={'/dashboard'}>Dashboard</Link></li>
        {
          tabs.map((tab) => {
            if (verifyUserRole(role, tab)) {
              return (<li key={tab}><Link className={`px-2 lg:px-4 font-bold ${pathname === `/dashboard/${tab.toLocaleLowerCase()}` ? "border-b-2 dark:border-white border-black" : ""}`} href={`/dashboard/${tab.toLowerCase()}`}>{tab}</Link></li>)
            }
          })
        }
      </ul>
    </nav>
  )
}

export default DashboardNav