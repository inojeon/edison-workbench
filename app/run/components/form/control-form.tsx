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

const controlFormSchema = z.object({
  calculation: z.string(),
  pseudo_dir: z.string(),
  restart_mode: z.string(),
  prefix: z.string(),
})

type ControlFormValues = z.infer<typeof controlFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ControlFormValues> = {
  calculation: "scf",
  pseudo_dir: "./",
  restart_mode: "from_scratch",
  prefix: "output",
}

export function ControlForm() {
  const form = useForm<ControlFormValues>({
    resolver: zodResolver(controlFormSchema),
    defaultValues,
  })

  // console.log(form.getValues())

  function onSubmit(data: ControlFormValues) {
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
                | "prefix"
                | "calculation"
                | "pseudo_dir"
                | "restart_mode"
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
