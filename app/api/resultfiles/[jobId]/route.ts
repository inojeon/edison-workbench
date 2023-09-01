import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const res = await fetch(
    `${process.env.API_SEVER_URL}${request.nextUrl.pathname.split("/api")[1]}`
  )
  const data = await res.json()

  console.log("resultefile jobid")
  return NextResponse.json(data)
}
