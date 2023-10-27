"use client";
import { GetUserContext } from "@/components/context/UserContent";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";


const Profile = () => {
    const { data: session, status } = useSession();
    const {currentUser, getCurrentUser} = useContext(GetUserContext)
    useEffect(() => {
        //@ts-ignore
        !currentUser.id  && getCurrentUser()   
         return () => {
           
         }
       }, [])
    if (!status) {
        return <div>Loading!</div>;
    }   
    console.log(currentUser, 'currentUser')
    
    //@ts-ignore
    if (session) {
        //@ts-ignore
        <div>
            Here is your profile
        </div>
       
    }
};
export default Profile;
