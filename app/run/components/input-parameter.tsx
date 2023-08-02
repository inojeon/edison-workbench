"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PresetSelector } from "@/app/input/components/preset-selector"
import { presets } from "@/app/input/data/presets"

import { SciApp, sciApps } from "../data/sciApps"
import { AppSelector } from "./app-selector"
import { InputfileSelector } from "./inputfile-selector"

export function BasicInformation() {
  const [selectedApp, setSelectedApp] = useState<SciApp>()
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
      </CardContent>
      {/* <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter> */}
    </Card>
  )
}
