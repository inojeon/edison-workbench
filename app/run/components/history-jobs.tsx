import {
  CalendarIcon,
  ClipboardCopyIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function HistoryJobs() {
  return (
    <Command className="w-full rounded-lg border">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="최근 실행 작업">
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>Job #0001</span>
          </CommandItem>
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>Job #0002</span>
          </CommandItem>
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>Job #0003</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="공개 작업">
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
