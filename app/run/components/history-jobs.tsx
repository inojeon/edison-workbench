"use client"

import { useEffect, useState } from "react"
import { ClipboardCopyIcon } from "@radix-ui/react-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export interface SetCurrentJob {
  jobName: string
  jobId: number
  status: string
  jobDir: string
  startdDate: string
  endData: string
}

export function HistoryJobs() {
  const [currentJobs, setCurrentJobs] = useState<SetCurrentJob[]>([])

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setCurrentJobs(data)
      })
  }, [])

  // console.log(currentJobs)

  const clickJob = (job: SetCurrentJob) => {
    console.log(job)
  }

  return (
    <Command className="w-full rounded-lg border">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="최근 실행 작업">
          {currentJobs &&
            currentJobs.map((job) => (
              <CommandItem
                className="ml-2 hover:cursor-pointer"
                key={job.jobId}
                onSelect={() => {
                  clickJob(job)
                }}
              >
                <ClipboardCopyIcon className="mr-2 h-4 w-4" />
                <span>
                  #{job.jobId} {job.jobName}
                </span>
              </CommandItem>
            ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="튜토리얼">
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>Tutorial 1</span>
          </CommandItem>
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>Tutorial 2</span>
          </CommandItem>
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>Tutorial 3</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
