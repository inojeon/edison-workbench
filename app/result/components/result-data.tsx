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

export function ResultData() {
  return (
    <Command className="w-full rounded-lg border">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="result">
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>simulation.log</span>
          </CommandItem>
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>simulation.out</span>
          </CommandItem>
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>bands.out</span>
          </CommandItem>
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>bands.log</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Logs">
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>std.out</span>
          </CommandItem>
          <CommandItem className="ml-2">
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <span>std.err</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
