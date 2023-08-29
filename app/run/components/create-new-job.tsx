"use client"

import * as React from "react"

import { Separator } from "@/components/ui/separator"

import { BasicInformation } from "./basic-information"
import EnterInputParameter from "./enter-inputparameter"
import { JobClear } from "./job-clear"
import { JobExecte } from "./job-execte"

export interface JobDetail {
  programName: string
  inputFiles: {
    option: string
    path: string
  }[]
  inputParameter: string
  jobName: string
  jobDescription: string
  isParallel: false
  cpuCores?: number
}

const initJobDetail: JobDetail = {
  programName: "qe_test",
  inputFiles: [],
  inputParameter: "",
  jobName: "test1",
  jobDescription: "",
  isParallel: false,
}

export default function CreateNewJob() {
  const [jobDetail, setJobDetail] = React.useState<JobDetail>(initJobDetail)

  const changeProgramName = (programName: string) => {
    setJobDetail((prev) => ({
      ...prev,
      programName,
    }))
  }

  console.log(jobDetail)
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
      <div className="items-start justify-center gap-6 rounded-lg p-8 lg:grid lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1 grid items-start gap-6 md:w-full lg:col-span-1">
          <BasicInformation jobDetail={jobDetail} setJobDetail={setJobDetail} />
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1 xl:col-span-2">
          {jobDetail.programName !== "" && (
            <div className="flex items-center justify-center [&>div]:w-full">
              <EnterInputParameter />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
