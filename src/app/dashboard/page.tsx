"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!status) {
    return <div>Loading!</div>;
  }
  //@ts-ignore
  if (session) {
    //@ts-ignore
    switch (session?.user?.role) {
      case "ADMINISTRATOR":
        router.push("/dashboard/admin");
        break;
      case "SUBSCRIBER":
        router.push("/dashboard/user");
        break;
      default:
        router.push("/signin");
        break;
    }
  }
};
export default Profile;
