"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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

const electronFormSchema = z.object({
  conv_thr: z.number(),
  electron_maxstep: z.number(),
  mixing_beta: z.number(),
  mixing_mode: z.string(),
  scf_must_converge: z.string(),
  startingwfc: z.string(),
})

type ElectronFormValues = z.infer<typeof electronFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ElectronFormValues> = {
  conv_thr: 1e-6,
  electron_maxstep: 200,
  mixing_beta: 0.1,
  mixing_mode: "plain",
  scf_must_converge: ".TRUE.",
  startingwfc: "atomic+random",
}

export function ElectronForm() {
  const form = useForm<ElectronFormValues>({
    resolver: zodResolver(electronFormSchema),
    defaultValues,
  })

  function onSubmit(data: ElectronFormValues) {
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
                | "conv_thr"
                | "electron_maxstep"
                | "mixing_beta"
                | "mixing_mode"
                | "scf_must_converge"
                | "startingwfc"
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
