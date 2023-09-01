import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SetCurrentJob } from "@/app/run/components/history-jobs"

import { ResultData } from "./result-data"

// import { Playlist } from "../data/playlists"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  jobName: string
  data: SetCurrentJob
  setSelectReusltFile: React.Dispatch<React.SetStateAction<string | null>>
}

interface ResultFileRes {
  ok: boolean
  fileLists: {
    type: string
    name: string
  }[]
  filePath: string
  message?: string
}

export function Sidebar({
  jobName,
  data,
  setSelectReusltFile,
  className,
}: SidebarProps) {
  const [resultFiles, setResultFiles] = useState<ResultFileRes>()

  useEffect(() => {
    fetch(`/api/resultfiles/${data.jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setResultFiles(data)
      })
  }, [data])

  return (
    <div className={cn("pb-12", className)}>
      <div className="px-3 py-2">
        <h2 className="mb-2  tracking-tight">{jobName}</h2>
        <div className="mt-4 space-y-1">
          <Button
            variant="secondary"
            className="w-full justify-center"
            onClick={() => {
              setSelectReusltFile(null)
            }}
          >
            Summary
          </Button>
        </div>
        <div className="mt-4 space-y-1">
          {resultFiles && (
            <ResultData
              fileLists={resultFiles.fileLists}
              setSelectReusltFile={setSelectReusltFile}
            />
          )}
        </div>
      </div>
    </div>
  )
}
