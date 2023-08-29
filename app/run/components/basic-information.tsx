"use client"

import React, { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { SciApp, sciApps } from "../data/sciApps"
import { AppSelector } from "./app-selector"
import { JobDetail } from "./create-new-job"
import { InputfileSelector } from "./inputfile-selector"

interface BasicInformationProps {
  jobDetail: JobDetail
  setJobDetail: React.Dispatch<React.SetStateAction<JobDetail>>
}

export function BasicInformation({
  jobDetail,
  setJobDetail,
}: BasicInformationProps) {
  const [selectedApp, setSelectedApp] = React.useState<SciApp | undefined>()

  useEffect(() => {
    if (selectedApp?.id && jobDetail.programName !== selectedApp?.id) {
      setJobDetail((prev) => ({
        ...prev,
        programName: selectedApp?.id,
      }))
    }
  }, [selectedApp, jobDetail.programName, setJobDetail])

  // console.log(selectedApp)

  const selectInputFile = (filePath: string) => {
    setJobDetail((prev) => ({
      ...prev,
      inputFiles: [
        ...prev.inputFiles,
        {
          path: filePath,
          option: "--mol",
        },
      ],
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1. Basic Information</CardTitle>
        <CardDescription>작업 제출을 위한 기본 정보 입력</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="jobName">Job Name</Label>
          <Input
            id="jobName"
            placeholder="Job #0004"
            onChange={(e) => {
              setJobDetail((prev) => ({
                ...prev,
                jobName: e.target.value,
              }))
            }}
            defaultValue={jobDetail.jobName}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">
            Description
            <span className=" text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Please include information to your job."
            onChange={(e) => {
              setJobDetail((prev) => ({
                ...prev,
                jobDescription: e.target.value,
              }))
            }}
            defaultValue={jobDetail.jobDescription}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Select Science App</Label>
          <AppSelector
            sciApps={sciApps}
            selectedApp={selectedApp}
            setSelectedApp={setSelectedApp}
          />
        </div>

        {selectedApp?.type === "parallel" && (
          <div className="grid gap-2">
            <Label htmlFor="numCores">Num Cores</Label>
            <Input
              id="cores"
              placeholder="1"
              type="number"
              onChange={(e) => {
                setJobDetail((prev) => ({
                  ...prev,
                  cpuCores: parseInt(e.target.value),
                }))
              }}
              defaultValue={jobDetail.cpuCores}
            />
          </div>
        )}
        {selectedApp && (
          <div className="grid gap-2">
            <Label htmlFor="molSelect">Select Mol File</Label>
            <InputfileSelector selectInputFile={selectInputFile} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
