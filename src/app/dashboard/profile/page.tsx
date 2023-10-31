"use client";
import { UserUpdateForm } from "@/components/Dashboard/user/UserUpdateForm";
import { GetUserContext } from "@/components/context/UserContent";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";


const Profile = () => {
    const { data: session, status } = useSession();
    const {currentUser, getCurrentUser} = useContext(GetUserContext)
    useEffect(() => {
        //@ts-ignore
        session?.user.id  && getCurrentUser(session?.user.id)   
         return () => {
           
         }
       }, [])
    if (!status) {
        return <div>Loading!</div>;
    }   
    
  
    //@ts-ignore
    if (session && currentUser.userData) {  
         //@ts-ignore
        const { name, phone, profession, professional_pin, email } = currentUser?.userData
         return <UserUpdateForm {...{ name, phone, profession, professional_pin, email}} /> 
    }
};
export default Profile;
