import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const res = await fetch(`${process.env.API_SEVER_URL}/jobs`)
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const postData = await req.json()
  const res = await fetch(`${process.env.API_SEVER_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })

  const data = await res.json()

  return NextResponse.json(data)
}
