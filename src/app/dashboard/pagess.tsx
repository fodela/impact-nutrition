"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


const Dasboard = () => {
  const { data: session, status } = useSession();

    if (!status) {
    return <div>Loading!</div>;
  }
  return <div>Dashboard</div>
  // //@ts-ignore
  // if (session) {
  //   //@ts-ignore
  //   switch (session?.user?.role) {
  //     case "ADMINISTRATOR":
  //      redirect("/dashboard/admin");
  //       break;
  //     case "SUBSCRIBER":
  //      redirect("/dashboard/subscriber");
  //       break;
  //     default:
  //      redirect("/signin");
  //       break;
  //   }
  // }
};
export default Dasboard;
