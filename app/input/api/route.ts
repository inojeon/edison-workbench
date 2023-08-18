import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const res = await fetch(`${process.env.API_SEVER_URL}/inputfiles`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })
  const data = await res.json()

  console.log(data)

  return NextResponse.json({ ok: true, data })
}
