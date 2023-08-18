"use client"

import { use, useEffect, useState } from "react"
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

// import { Preset, samplePresets } from "../data/presets"

interface MolDataReturn {
  ok: boolean
  mol: string
}

interface Inputfile {
  name: string
  type: string
}

// interface PresetSelectorProps extends PopoverProps {
//   presets: Preset[]
// }

interface InputFilesRes {
  ok: boolean
  filePath: string
  fileLists: Inputfile[]
  message?: string
}

const getInputfiles = async (): Promise<InputFilesRes> => {
  const data = await fetch("/api/input?exe=mol")
  const inputfileRes = await data.json()

  return inputfileRes
}

export function PresetSelector({ ...props }) {
  const [open, setOpen] = useState(false)

  const [inputfileRes, setInputfileRes] = useState<InputFilesRes>()

  // const inputfileRes = use(getInputfiles())

  console.log(inputfileRes)
  const [selectedInputfile, setSelectedInputfile] = useState<Inputfile>()

  useEffect(() => {
    fetch("/api/input?exe=mol")
      .then((res) => res.json())
      .then((data) => {
        setInputfileRes(data)
        // setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch(`/api/input/${selectedInputfile?.name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data?.ok) {
          console.log(data.content)
          const frm: any = document.getElementById("cristalEditor")
          if (frm) {
            frm.contentWindow.crystalEditor.LoadMolFile(data.content)
          }
        }
        // setInputfileRes(data)
        // setLoading(false)
      })
    console.log(selectedInputfile)
  }, [selectedInputfile])

  // useEffect(() => {
  //   if (data?.ok) {
  //     const frm: any = document.getElementById("cristalEditor")
  //     if (frm) {
  //       frm.contentWindow.crystalEditor.LoadMolFile(data.mol)
  //     }
  //   }
  // }, [data])

  const selectInputfile = (inputfile: Inputfile) => {
    setSelectedInputfile(inputfile)
    setOpen(false)
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
          <CommandInput placeholder="Search presets..." />
          <CommandEmpty>No presets found.</CommandEmpty>
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
            {/* <CommandItem onSelect={() => router.push("/examples")}>
              More examples
            </CommandItem> */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
