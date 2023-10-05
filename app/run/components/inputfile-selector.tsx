"use client"

import { useEffect, useState } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

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

interface Inputfile {
  name: string
  type: string
}

interface InputFilesRes {
  ok: boolean
  filePath: string
  fileLists: Inputfile[]
  message?: string
}

interface InputfileSelectorProps {
  selectInputFile: (filePath: string) => void
}

export function InputfileSelector({
  selectInputFile,
  ...props
}: InputfileSelectorProps) {
  const [open, setOpen] = useState(false)
  const [inputfileRes, setInputfileRes] = useState<InputFilesRes>()
  const [selectedInputfile, setSelectedInputfile] = useState<Inputfile>()

  useEffect(() => {
    fetch("/api/input?exe=cif")
      .then((res) => res.json())
      .then((data) => {
        setInputfileRes(data)
      })
  }, [])

  useEffect(() => {
    console.log(selectedInputfile)
  }, [selectedInputfile])

  const selectInputfile = (inputfile: Inputfile) => {
    setSelectedInputfile(inputfile)
    setOpen(false)
    selectInputFile(`${inputfileRes?.filePath}/${inputfile.name}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {selectedInputfile ? selectedInputfile.name : "Select a Inputfile"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search inputfiles..." />
          <CommandEmpty>No inputfile found.</CommandEmpty>
          <CommandGroup heading="Repository">
            {inputfileRes &&
              inputfileRes.fileLists.map((inputfile) => (
                <CommandItem
                  key={inputfile.name}
                  onSelect={() => {
                    selectInputfile({
                      name: inputfile.name,
                      type: inputfile.type,
                    })
                  }}
                >
                  {inputfile.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedInputfile?.name === inputfile.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup className="pt-0">
            <CommandItem>More examples</CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
