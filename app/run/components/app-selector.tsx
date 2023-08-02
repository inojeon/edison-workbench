"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"

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

import { SciApp } from "../data/sciApps"

interface AppSelectorProps extends PopoverProps {
  sciApps: SciApp[]
  selectedApp: SciApp | undefined
  setSelectedApp: React.Dispatch<React.SetStateAction<SciApp | undefined>>
}

export function AppSelector({
  sciApps,
  selectedApp,
  setSelectedApp,
  ...props
}: AppSelectorProps) {
  const [open, setOpen] = React.useState(false)
  // const [selectedApp, setSelectedApp] = React.useState<SciApp>()

  const selectApp = (sciApp: SciApp) => {
    setSelectedApp(sciApp)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select a Science App..."
          aria-expanded={open}
          className="flex-1 justify-between "
        >
          {selectedApp ? selectedApp.name : "Load a preset..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search science App..." />
          <CommandEmpty>No Apps found.</CommandEmpty>
          <CommandGroup heading="Electronic Structure Calculation SW">
            {sciApps.map((sciApp) => (
              <CommandItem
                key={sciApp.id}
                onSelect={() => {
                  selectApp(sciApp)
                }}
              >
                {sciApp.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedApp?.id === sciApp.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
