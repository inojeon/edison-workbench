import { Separator } from "@/components/ui/separator"

import { PresetActions } from "./components/preset-actions"
import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { presets } from "./data/presets"

export default function IndexPage() {
  return (
    <section className="container grid items-center">
      <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="ml-4 w-40 text-lg font-semibold">Crystal Editor</h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <PresetSelector presets={presets} />
          <PresetSave />
          <div className="hidden space-x-2 md:flex">
            {/* <CodeViewer />
            <PresetShare /> */}
          </div>
          <PresetActions />
        </div>
      </div>
      <Separator />
      <div className="flex h-[calc(100vh-156px)] flex-col items-start gap-2 ">
        <iframe
          width="100%"
          height="100%"
          src="/editor/CrystalEditor/index.html"
        ></iframe>
      </div>
      <div className=" h-full"></div>
    </section>
  )
}
