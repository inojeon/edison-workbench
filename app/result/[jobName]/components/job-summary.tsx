"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StdLogs from "@/app/result/[jobName]/components/std-log"
import { SetCurrentJob } from "@/app/run/components/history-jobs"

interface JobSummaryProps {
  data: SetCurrentJob
}

export default function JobSummary({ data }: JobSummaryProps) {
  return (
    <div className="grid  w-full gap-6 gap-y-4 rounded-lg p-4">
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.jobName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              <div className=" text-end">Job Name :</div>
              <div className=" col-span-2">{data.jobName}</div>
              <div className=" text-end">Job Status :</div>
              <div className=" col-span-2">{data.status}</div>
              <div className=" text-end">Job ID :</div>
              <div className=" col-span-2">{data.jobId}</div>
              <div className=" text-end">Job Dir Path :</div>
              <div className=" col-span-2">{data.jobDir}</div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* {data && <StdLogs jobId={data.jobId} />} */}
      {data && data.status == "RUNNING" && <StdLogs jobId={data.jobId} />}
    </div>
  )
}
