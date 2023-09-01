import useSWR from "swr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface ResultFileView {
  fileName: string
  jobId: number
}

export default function ResultFileView({ fileName, jobId }: ResultFileView) {
  const { data, error, isLoading } = useSWR(
    `/api/resultfiles/${jobId}/${fileName}`,
    fetcher,
    { refreshInterval: 1000 }
  )
  return (
    <div className="grid w-full gap-6 gap-y-4 rounded-lg p-4">
      <Card>
        <CardHeader>
          <CardTitle>{fileName}</CardTitle>
        </CardHeader>
        <CardContent>
          {data && (
            <pre className="grid gap-x-4 gap-y-3 overflow-auto text-sm">
              {data.content}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
