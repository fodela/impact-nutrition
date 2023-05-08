"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function SessionButtons() {
  const { data: session } = useSession()
  if (session) {
    return (
      <button className="bg-colorPrimary hover:bg-green-900 px-4 rounded-xl text-white transition-colors duration-1200" onClick={() => signOut()}>Sign out</button>
    )
  }
  
  return (
    <button className="bg-colorPrimary hover:bg-green-900 px-4 rounded-xl text-white transition-colors duration-1200" onClick={() => signIn()}>Sign in</button>
  )
  
}