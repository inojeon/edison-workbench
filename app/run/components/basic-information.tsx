"use client"

import { useState } from "react"

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
import { presets } from "@/app/input/data/presets"

import { SciApp, sciApps } from "../data/sciApps"
import { AppSelector } from "./app-selector"
import { InputfileSelector } from "./inputfile-selector"

interface BasicInformationProps {
  selectedApp: SciApp | undefined
  setSelectedApp: React.Dispatch<React.SetStateAction<SciApp | undefined>>
}

export function BasicInformation({
  selectedApp,
  setSelectedApp,
}: BasicInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1. Basic Information</CardTitle>
        <CardDescription>작업 제출을 위한 기본 정보 입력</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="subject">Job Name</Label>
          <Input id="subject" placeholder="Job #0004" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">
            Description{" "}
            <span className=" text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Please include information to your job."
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

        <div className="grid gap-2">
          {/* <Label htmlFor="numCores">엠바고?</Label>
           */}
        </div>
        {selectedApp?.type === "parallel" && (
          <div className="grid gap-2">
            <Label htmlFor="numCores">Num Cores</Label>
            <Input id="cores" placeholder="1" type="number" />
          </div>
        )}
        {selectedApp && (
          <div className="grid gap-2">
            <Label htmlFor="molSelect">Select Mol File</Label>
            <InputfileSelector presets={presets} />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" disabled checked />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            실행한 데이터는 중앙센터에서 가져갑니다.
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
