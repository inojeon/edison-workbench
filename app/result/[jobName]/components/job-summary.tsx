"use client"

import { useEffect, useState } from "react"

interface JobSummaryProps {
  jobName: string
}

export default function JobSummary({ jobName }: JobSummaryProps) {
  const [jobDetail, setJobDetail] = useState()

  useEffect(() => {
    fetch(`/api/detailjob/${jobName}`)
      .then((res) => res.json())
      .then((data: any) => {
        setJobDetail(data)
      })
  }, [])

  console.log(jobDetail)

  return (
    <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
      <div>aa</div>
    </div>
  )
}
