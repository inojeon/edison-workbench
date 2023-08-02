"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const inputParameterFormSchema = z.object({
  CONTROL: z.object({
    calculation: z.string(),
    pseudo_dir: z.string(),
    restart_mode: z.string(),
    prefix: z.string(),
  }),
  SYSTEM: z.object({
    nat: z.number(),
    ntyp: z.number(),
    ecutwfc: z.number(),
    ecutrho: z.number(),
    degauss: z.number(),
    ibrav: z.number(),
    nosym: z.string(),
  }),
})

type InputParameterFormValues = z.infer<typeof inputParameterFormSchema>

// This can come from your database or API.
const defaultValues: Partial<InputParameterFormValues> = {
  CONTROL: {
    calculation: "scf",
    pseudo_dir: "./",
    restart_mode: "from_scratch",
    prefix: "output",
  },
  SYSTEM: {
    nat: 2,
    ntyp: 1,
    ecutwfc: 20,
    ecutrho: 160,
    degauss: 0,
    ibrav: 0,
    nosym: ".TRUE.",
  },
}

export function InputParameterForm() {
  const form = useForm<InputParameterFormValues>({
    resolver: zodResolver(inputParameterFormSchema),
    defaultValues,
  })

  function onSubmit(data: InputParameterFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  // const InstancePerson = inputParameterFormSchema.parse({})
  console.log(form)

  return <div className=" border-t">aaa</div>
}
