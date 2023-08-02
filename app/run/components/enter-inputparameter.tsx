"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ControlForm } from "./form/control-form"
import { ElectronForm } from "./form/electrons-form"
import { KPointAutometicForm } from "./form/k-points-autometic"
import { SystemForm } from "./form/system-form"

export default function EnterInputParameter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 2. Create Input Parameter</CardTitle>
        <CardDescription>
          ScienceApp 실행을 위한 파라미터 정보를 입력하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 xl:grid-cols-2">
        <div>
          <CardTitle>Contrl</CardTitle>
          <div className="pl-4">
            <ControlForm />
          </div>
        </div>
        <div>
          <CardTitle>System</CardTitle>
          <div className="pl-4">
            <SystemForm />
          </div>
        </div>
        <div>
          <CardTitle>Electron</CardTitle>
          <div className="pl-4">
            <ElectronForm />
          </div>
        </div>
        <div>
          <CardTitle>K Point Autometic</CardTitle>
          <div>
            <KPointAutometicForm />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
