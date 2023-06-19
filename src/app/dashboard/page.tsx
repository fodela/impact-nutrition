'use client'
import { redirect } from "next/navigation";
import TabMenu from "@/components/Dashboard/DashboardTab";
import { useSession } from "next-auth/react";

const Profile = async () => {
  // const { data: session, status } = useSession()

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status === "unauthenticated" && !session) {
  //   redirect("/api/auth/signin");
  // }
  // //@ts-ignore
  // const role = user.role;
  return (
    <div className="mx-2 rounded bg-gray-200 dark:bg-black/30">
      {/* <TabMenu role={role} /> */}
      Dashboard
    </div>
  );
};
export default Profile;
