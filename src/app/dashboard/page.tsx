"use client";
import { useSession } from "next-auth/react";


const Dasboard = () => {
  const { data: session, status } = useSession();


    if (!status) {
    return <div>Loading!</div>;
  }
  //@ts-ignore
  if (session) {
    //@ts-ignore
    switch (session?.user?.role) {
      case "ADMINISTRATOR":
       window.location.href = ("/dashboard/admin");
        break;
      case "SUBSCRIBER":
       window.location.href = ("/dashboard/subscriber");
        break;
      default:
       window.location.href = ("/signin");
        break;
    }
  }
};
export default Dasboard;
