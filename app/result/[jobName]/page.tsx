"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import useSWR from "swr"

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
import ResultFileView from "./components/result-file-view"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function IndexPage() {
  const [seletedResultFile, setSelectReusltFile] = React.useState<
    string | null
  >(null)

  const jobName = usePathname().split("/")[2]
  const { data, error, isLoading } = useSWR(
    `/api/detailjob/${jobName}`,
    fetcher,
    { refreshInterval: 2000 }
  )

  console.log(seletedResultFile)

  return (
    <section className="container mt-4">
      {data && (
        <Card className=" flex  h-[calc(100vh-96px)]">
          <div className=" w-60 border-r pt-2">
            <Sidebar
              jobName={jobName}
              data={data}
              setSelectReusltFile={setSelectReusltFile}
            />
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
            {seletedResultFile ? (
              <ResultFileView jobId={data.jobId} fileName={seletedResultFile} />
            ) : (
              <JobSummary data={data} />
            )}
          </div>
        </Card>
      )}
    </section>
  )
}
