import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui_tmp/card"

import { BasicInformation } from "./components/basic-information"
import { JobClear } from "./components/job-clear"
import { JobExecte } from "./components/job-execte"
import { Sidebar } from "./components/sidebar"

function RunPageContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  )
}

export default function IndexPage() {
  return (
    <section className="container mt-4">
      <Card className=" flex">
        <div className="w-60 border-r pt-2">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="flex  flex-row items-center justify-between space-y-2 p-4 sm:space-y-0 md:h-16">
            <h2 className="w-40 text-lg font-semibold">Create New Job</h2>
            {/* {/* <div className="ml-auto flex w-full space-x-2 sm:justify-end"> */}
            {/* <PresetSelector presets={presets} />
          <PresetSave />
          <PresetActions /> */}
            <div className="flex gap-x-2">
              <JobClear />
              <JobExecte />
            </div>
          </div>
          <Separator />
          <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
            <div className="col-span-1 grid items-start gap-6 lg:col-span-1">
              <RunPageContainer>
                <BasicInformation />
              </RunPageContainer>
            </div>
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
              <div>ccc</div>
            </div>
            <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
              <div>bbb</div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
