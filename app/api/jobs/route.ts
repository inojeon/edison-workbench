import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const res = await fetch(`${process.env.API_SEVER_URL}/jobs`)
  const data = await res.json()
  return NextResponse.json(data)
}
