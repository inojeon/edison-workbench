"use clinet"

import { useEffect } from "react"
import * as TOML from "@iarna/toml"
import { JSONSchema4 } from "json-schema"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { qeTestSchema } from "@/lib/qe_test"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import FormGroup from "./form-group"

// import { FormGroup } from "./form-group"

interface InputsFormProps {
  inputSchema: JSONSchema4
  sampleInput: object
  getInputParameter: (inputParameter: string) => void
}

const getRootObjectProperties = (jsonSchema: JSONSchema4) => {
  let result = []
  if (jsonSchema.properties) {
    for (const [key, value] of Object.entries(jsonSchema.properties)) {
      if (value.type == "object") {
        result.push({
          name: key,
          properties: value,
        })
      }
    }
  }
  return result
}

export default function InputsForm({
  inputSchema,
  sampleInput,
  getInputParameter,
}: InputsFormProps) {
  const form = useForm<z.infer<typeof qeTestSchema>>({
    // resolver: zodResolver(qeTestSchema),
    defaultValues: sampleInput,
    reValidateMode: "onChange",
  })

  console.log(form.getValues())

  function onSubmit(data: z.infer<typeof qeTestSchema>) {
    console.log(TOML.stringify(data))
    getInputParameter(TOML.stringify(data))
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2  rounded-md bg-slate-950 p-4">
          <code className="text-white">{TOML.stringify(data)}</code>
        </pre>
      ),
    })
  }
  // console.log(getRootObjectProperties(inputSchema))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* <FormGroup control={form.control} name="sddss" /> */}
        {getRootObjectProperties(inputSchema).map(
          (property, key) =>
            inputSchema.properties && (
              <FormGroup
                control={form.control}
                name={property.name}
                key={key}
                properties={property.properties}
              />
            )
        )}

        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
