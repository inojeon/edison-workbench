import { useEffect, useState } from "react"

import { SetCurrentJob } from "@/app/run/components/history-jobs"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function JobsTable() {
  const [jobLists, setJobLists] = useState<
    {
      jobId: number
      jobName: string
      status: string
      startDate: string
      endDate: string
    }[]
  >([])
  // const tasks = await getTasks()

  useEffect(() => {
    fetch("/api/jobs?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setJobLists(data)
      })
  }, [])
  // console.log(jobLists)
  return jobLists.length !== 0 ? (
    <DataTable data={jobLists} columns={columns} />
  ) : (
    <></>
  )
}
