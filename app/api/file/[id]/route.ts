import { promises as fs } from "fs"
import path from "path"
import { NextRequest, NextResponse } from "next/server"

import { presets, samplePresets } from "../../../input/data/presets"

export async function GET(request: NextRequest) {
  const fileId = request.url.split("/").slice(-1)[0]
  if (fileId === "undefined") {
    return NextResponse.json({ error: "No exist File" }, { status: 401 })
  }

  const presetLists = [...presets, ...samplePresets]

  const findPreset = presetLists.find((pre) => pre.id == fileId)

  if (!findPreset) {
    return NextResponse.json({ error: "No exist File" }, { status: 401 })
  }

  const data = await fs.readFile(
    path.join(process.cwd(), "app/input", findPreset.path)
  )

  const mol = data.toString()

  return NextResponse.json({ ok: true, mol })
}
