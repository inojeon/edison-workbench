"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StdLogsProps {
  jobId: number
}
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function StdLogs({ jobId }: StdLogsProps) {
  const { data, error, isLoading } = useSWR(
    `/api/resultfiles/${jobId}/std.out`,
    fetcher,
    { refreshInterval: 1000 }
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logs</CardTitle>
      </CardHeader>
      <CardContent>
        {data && (
          <pre className="grid gap-x-4 gap-y-3 overflow-auto text-sm">
            {data.content}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}
