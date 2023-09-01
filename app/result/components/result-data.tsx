import {
  ArchiveIcon,
  ClipboardCopyIcon,
  FileTextIcon,
} from "@radix-ui/react-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

interface ResultDataProps {
  fileLists: {
    type: string
    name: string
  }[]
  setSelectReusltFile: React.Dispatch<React.SetStateAction<string | null>>
}

export function ResultData({
  fileLists,
  setSelectReusltFile,
}: ResultDataProps) {
  return (
    <Command className="w-full rounded-lg border">
      <CommandInput placeholder="Search..." />
      <CommandList className="max-h-[500px]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="result">
          {fileLists.map((file, key) => (
            <CommandItem
              key={key}
              className="ml-2"
              onSelect={() => {
                if (file.type == "file") {
                  setSelectReusltFile(file.name)
                }
              }}
            >
              {file.type == "file" ? (
                <FileTextIcon className="mr-2 h-4 w-4" />
              ) : (
                <ArchiveIcon className="mr-2 h-4 w-4" />
              )}
              <span>{file.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
