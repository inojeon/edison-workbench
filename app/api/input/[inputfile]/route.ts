import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const inputfile = request.url.split("/").slice(-1)[0]
  // console.log(request)
  // const parsedUrl = new URL(request.url)
  const res = await fetch(
    `${process.env.API_SEVER_URL}/inputfiles/${inputfile}`
  )
  const data = await res.json()

  return NextResponse.json(data)
}
