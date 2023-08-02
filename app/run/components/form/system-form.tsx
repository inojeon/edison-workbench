"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const systemFormSchema = z.object({
  nat: z.number(),
  ntyp: z.number(),
  ecutwfc: z.number(),
  ecutrho: z.number(),
  degauss: z.number(),
  ibrav: z.number(),
  nosym: z.string(),
})

type SystemFormValues = z.infer<typeof systemFormSchema>

// This can come from your database or API.
const defaultValues: Partial<SystemFormValues> = {
  nat: 2,
  ntyp: 1,
  ecutwfc: 20,
  ecutrho: 160,
  degauss: 0,
  ibrav: 0,
  nosym: ".TRUE.",
}

export function SystemForm() {
  const form = useForm<SystemFormValues>({
    resolver: zodResolver(systemFormSchema),
    defaultValues,
  })

  function onSubmit(data: SystemFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.keys(defaultValues).map((keyName, keyIndex) => (
          <FormField
            key={keyIndex}
            control={form.control}
            name={
              keyName as
                | "nat"
                | "ntyp"
                | "ecutwfc"
                | "ecutrho"
                | "degauss"
                | "ibrav"
                | "nosym"
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel>{keyName}</FormLabel>
                <FormControl>
                  <Input placeholder={keyName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  )
}
