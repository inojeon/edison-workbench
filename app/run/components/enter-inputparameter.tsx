"use client"

import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import InputsForm from "./form/inputs-form"

interface EnterInputParameterProps {
  program_name: string
  getInputParameter: (inputParameter: string) => void
}

export default function EnterInputParameter({
  program_name,
  getInputParameter,
}: EnterInputParameterProps) {
  const [inputSchema, setInputSchema] = useState()
  const [sampleInput, setSampleInput] = useState()
  useEffect(() => {
    if (program_name !== "") {
      fetch(`/api/program/${program_name}/inputschema`)
        .then((res) => res.json())
        .then((data: any) => {
          setInputSchema(data)
        })
      fetch(`/api/program/${program_name}/sampleinput`)
        .then((res) => res.json())
        .then((data: any) => {
          setSampleInput(data)
        })
    }
  }, [])
  // console.log(inputSchema)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 2. Create Input Parameter</CardTitle>
        <CardDescription>
          ScienceApp 실행을 위한 파라미터 정보를 입력하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 xl:grid-cols-2">
        {inputSchema && sampleInput && (
          <InputsForm
            inputSchema={inputSchema}
            sampleInput={sampleInput}
            getInputParameter={getInputParameter}
          />
        )}
      </CardContent>
    </Card>
  )
}
