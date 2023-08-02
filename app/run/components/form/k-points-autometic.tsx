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

const kPointAutometicFormSchema = z.object({
  nk1: z.number(),
  nk2: z.number(),
  nk3: z.number(),
  sk1: z.number(),
  sk2: z.number(),
  sk3: z.number(),
})

type KPointAutometicFormValues = z.infer<typeof kPointAutometicFormSchema>

// This can come from your database or API.
const defaultValues: Partial<KPointAutometicFormValues> = {
  nk1: 8,
  nk2: 8,
  nk3: 8,
  sk1: 1,
  sk2: 1,
  sk3: 1,
}

export function KPointAutometicForm() {
  const form = useForm<KPointAutometicFormValues>({
    resolver: zodResolver(kPointAutometicFormSchema),
    defaultValues,
  })

  function onSubmit(data: KPointAutometicFormValues) {
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
            name={keyName as "nk1" | "nk2" | "nk3" | "sk1" | "sk2" | "sk3"}
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
