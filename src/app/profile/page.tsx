'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

const Profile = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin");
        },
    });

    if (status === "loading") {
        return <p>Loading....</p>;
    }
    return (
        <div>Profile</div>
    )
}

export default Profile