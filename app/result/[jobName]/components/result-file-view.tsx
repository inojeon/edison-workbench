import useSWR from "swr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { BandGapPlot, DosPlot } from "./plotly"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface ResultFileView {
  fileName: string
  jobId: number
}

const getFileExe = (fileName: string): string => {
  const exe = fileName.split(".").slice(-1)[0]
  let resultExe = "txt"
  switch (exe) {
    case "band":
    case "dos":
      resultExe = exe
      break

    default:
      break
  }
  return resultExe
}

export default function ResultFileView({ fileName, jobId }: ResultFileView) {
  const { data, error, isLoading } = useSWR(
    `/api/resultfiles/${jobId}/${fileName}`,
    fetcher
  )
  console.log(data)
  return (
    <div className="grid w-full gap-6 gap-y-4 rounded-lg p-4">
      <Card>
        <CardHeader>
          <CardTitle>{fileName}</CardTitle>
        </CardHeader>
        <CardContent className="">
          {!isLoading && (
            <>
              {getFileExe(fileName) == "band" && (
                <div className=" h-full w-full">
                  <BandGapPlot rowData={data.content} />
                </div>
              )}
              {getFileExe(fileName) == "dos" && (
                <div className=" h-full w-full">
                  <DosPlot rowData={data.content} />
                </div>
              )}
              {getFileExe(fileName) == "txt" && (
                <pre className="grid gap-x-4 gap-y-3 overflow-auto text-sm">
                  {data.content}
                </pre>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
