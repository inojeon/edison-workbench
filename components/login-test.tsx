"use client"

import { signIn, signOut, useSession } from "next-auth/react"

import { Button } from "./ui/button"
import { Label } from "./ui/label"

export default function LoginTest() {
  const { data: session } = useSession()

  console.log(session)

  return (
    <>
      {session ? (
        <div className="flex items-center justify-center gap-x-10">
          <Label>Hi ! {session.user?.name}</Label>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => signIn()}>Sign In</Button>
        </div>
      )}
    </>
  )
}
