import { useSession } from 'next-auth/react'
import React from 'react'

const SubscriberDash = () => {
    const { data: session, status } = useSession()
    console.log('session', session)
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 divide-y-2">
            <table className="w-full border-collapse  text-left text-sm">
                uses dashboadr
            </table>
        </div>
    )
}

export default SubscriberDash