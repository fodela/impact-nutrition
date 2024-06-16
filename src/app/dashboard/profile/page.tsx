"use client";
import { UserUpdateForm } from "@/components/Dashboard/user/UserUpdateForm";
import { GetUserContext } from "@/components/context/UserContent";
import { useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { checkAuth, fetchUser } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const Profile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, status, currentUser, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth()).unwrap().then((response) => {
      if (response.user) {
        dispatch(fetchUser(response.user.id));
      }
    });
  }, [dispatch]);

//   useEffect(() => {
//     if (user?.id) {
//       getCurrentUser(user.id);
//     }
//   }, [user, getCurrentUser]);

  if (status === 'loading') {
    return <div>Loading!</div>;
  }

  if (status === 'failed' || !user) {
    return <div>Please log in to view this page.</div>;
  }

  if (status === 'succeeded' && currentUser) {
    const { name, phone, profession, professional_pin, email } = currentUser;
    //@ts-ignore
    return <UserUpdateForm {...{ name, phone, profession, professional_pin, email }} />;
  }

  return null;
};

export default Profile;
