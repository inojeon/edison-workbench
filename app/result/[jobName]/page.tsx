"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { Sidebar } from "../components/sidebar"
import JobSummary from "./components/job-summary"

export default function IndexPage() {
  const jobName = usePathname().split("/")[2]

  console.log(jobName)

  return (
    <section className="container mt-4">
      <Card className=" flex  h-[calc(100vh-96px)]">
        <div className=" w-60 border-r pt-2">
          <Sidebar jobName={jobName} />
        </div>
        <div className="w-full  overflow-auto">
          <div className=" flex flex-row items-center justify-between space-y-2 p-4 sm:space-y-0 md:h-16">
            <h2 className=" text-lg font-semibold">{jobName} Results</h2>
            <div className="flex gap-x-2">
              <Button variant="outline">Re-Run Job</Button>
              <Button variant="outline">Download</Button>
              <Button variant="destructive">Delete Job</Button>
            </div>
          </div>
          <Separator />
          <JobSummary jobName={jobName} />
          <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3"></div>
        </div>
      </Card>
    </section>
  )
}
