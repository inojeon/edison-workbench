import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HistoryJobs } from "@/app/run/components/history-jobs"

import { ResultData } from "./result-data"

// import { Playlist } from "../data/playlists"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[]
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="px-3 py-2">
        <h2 className="mb-2  tracking-tight">Job 0001</h2>
        <div className="mt-4 space-y-1">
          <Button variant="secondary" className="w-full justify-center">
            Summary
          </Button>
        </div>
        <div className="mt-4 space-y-1">
          <ResultData />
        </div>
      </div>
    </div>
  )
}
