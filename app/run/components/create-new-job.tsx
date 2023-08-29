"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

import { SciApp } from "../data/sciApps"
import { BasicInformation } from "./basic-information"
import EnterInputParameter from "./enter-inputparameter"
import { JobClear } from "./job-clear"
import { JobExecte } from "./job-execte"

export default function CreateNewJob() {
  const [selectedApp, setSelectedApp] = React.useState<SciApp | undefined>()
  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-2 p-4 sm:space-y-0 md:h-16">
        <h2 className="w-40 text-lg font-semibold">Create New Job</h2>
        <div className="flex gap-x-2">
          <JobClear />
          <JobExecte />
        </div>
      </div>
      <Separator />
      <div className="items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1  grid items-start gap-6 lg:col-span-1">
          <div className="flex items-center justify-center [&>div]:w-full">
            <BasicInformation
              selectedApp={selectedApp}
              setSelectedApp={setSelectedApp}
            />
          </div>
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1 xl:col-span-2">
          {selectedApp && (
            <div className="flex items-center justify-center [&>div]:w-full">
              <EnterInputParameter />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
