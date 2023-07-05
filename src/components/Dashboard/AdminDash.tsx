import { useSession } from 'next-auth/react'
import React from 'react'

const AdminDash = () => {
    const { data: session, status } = useSession()
    console.log('session', session)
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 divide-y-2">
            <table className="w-full border-collapse  text-left text-sm">
                Admin dashboadr
            </table>
        </div>
    )
}

export default AdminDash