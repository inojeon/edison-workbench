import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const parsedUrl = new URL(request.url)
  const exe: string = parsedUrl.searchParams.get("exe") as string
  let res
  if (exe) {
    res = await fetch(
      `${process.env.API_SEVER_URL}/inputfiles?` +
        new URLSearchParams({
          exe,
        })
    )
  } else {
    res = await fetch(`${process.env.API_SEVER_URL}/inputfiles`)
  }
  const data = await res.json()

  console.log(data)

  return NextResponse.json(data)
}
