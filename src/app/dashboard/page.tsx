'use client'

import AdminDash from "@/components/Dashboard/AdminDash";
import DashboardTable from "@/components/Dashboard/DashboardTable";
import SubscriberDash from "@/components/Dashboard/SubscriberDash";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession()

  if (!status) {
    return <div>Loading!</div>
  }
  //@ts-ignore
  if (session) {
    return (
      <div className="mx-2 rounded bg-gray-200 dark:bg-black/30">
        {status &&
          //@ts-ignore
          session.user.role === 'ADMINISTRATOR' && <AdminDash />}
        {status &&
          //@ts-ignore
          session.user.role === 'SUBSCRIBER' && <SubscriberDash />}
      </div>
    );
  }
  return <div>Something went wrong!</div>
};
export default Profile;
