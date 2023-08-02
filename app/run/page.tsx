"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { BasicInformation } from "./components/basic-information"
import EnterInputParameter from "./components/enter-inputparameter"
import { JobClear } from "./components/job-clear"
import { JobExecte } from "./components/job-execte"
import { Sidebar } from "./components/sidebar"
import { SciApp } from "./data/sciApps"

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
  const [selectedApp, setSelectedApp] = React.useState<SciApp | undefined>()
  return (
    <section className="container mt-4">
      <Card className=" flex  h-[calc(100vh-96px)]">
        <div className=" w-60 border-r pt-2">
          <Sidebar />
        </div>
        <div className="w-full  overflow-auto">
          <div className=" flex flex-row items-center justify-between space-y-2 p-4 sm:space-y-0 md:h-16">
            <h2 className="w-40 text-lg font-semibold">Create New Job</h2>
            <div className="flex gap-x-2">
              <JobClear />
              <JobExecte />
            </div>
          </div>
          <Separator />
          <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
            <div className="col-span-1  grid items-start gap-6 lg:col-span-1">
              <RunPageContainer>
                <BasicInformation
                  selectedApp={selectedApp}
                  setSelectedApp={setSelectedApp}
                />
              </RunPageContainer>
            </div>
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1 xl:col-span-2">
              {selectedApp && (
                <RunPageContainer>
                  <EnterInputParameter />
                </RunPageContainer>
              )}
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
