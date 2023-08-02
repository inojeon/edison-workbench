"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"
import useSWR from "swr"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Preset, samplePresets } from "@/app/input/data/presets"

interface InputfileSelectorProps extends PopoverProps {
  presets: Preset[]
}

export function InputfileSelector({
  presets,
  ...props
}: InputfileSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedInputfile, setSelectedInputfile] = React.useState<Preset>()

  const selectInputfile = (preset: Preset) => {
    setSelectedInputfile(preset)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select a inputfile..."
          aria-expanded={open}
          className="flex-1 justify-between"
        >
          {selectedInputfile ? selectedInputfile.name : "Load a Inputfile..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search Inputfiles..." />
          <CommandEmpty>No Inputfile found.</CommandEmpty>
          <CommandGroup heading="Repository">
            {presets.map((preset) => (
              <CommandItem
                key={preset.id}
                onSelect={() => {
                  selectInputfile(preset)
                }}
              >
                {preset.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedInputfile?.id === preset.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Samples">
            {samplePresets.map((preset) => (
              <CommandItem
                key={preset.id}
                onSelect={() => {
                  setSelectedInputfile(preset)
                  setOpen(false)
                }}
              >
                {preset.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedInputfile?.id === preset.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup className="pt-0">
            <CommandItem>More examples</CommandItem>
            {/* <CommandItem onSelect={() => router.push("/examples")}>
              More examples
            </CommandItem> */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
