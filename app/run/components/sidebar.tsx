import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { HistoryJobs } from "./history-jobs"

// import { Playlist } from "../data/playlists"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[]
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="">
        <div className="px-3 py-2">
          <h2 className="mb-2  tracking-tight">New</h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Create Job
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2  tracking-tight">Recommended</h2>
          <div className="space-y-1">
            <HistoryJobs />
          </div>
        </div>
      </div>
    </div>
  )
}
