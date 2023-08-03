"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { SciApp } from "../run/data/sciApps"
import { Sidebar } from "./components/sidebar"

function RunPageContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  )
}

export default function IndexPage() {
  const [selectedApp, setSelectedApp] = React.useState<SciApp | undefined>()
  return (
    <section className="container mt-4">
      <Card className=" flex  h-[calc(100vh-96px)]">
        <div className=" w-60 border-r pt-2">
          <Sidebar />
        </div>
        <div className="w-full  overflow-auto">
          <div className=" flex flex-row items-center justify-between space-y-2 p-4 sm:space-y-0 md:h-16">
            <h2 className=" text-lg font-semibold">
              Job 0001 Result - Summary
            </h2>
            <div className="flex gap-x-2">
              <Button variant="outline">Re-Run Job</Button>
              <Button variant="outline">Download</Button>
              <Button variant="destructive">Delete Job</Button>
            </div>
          </div>
          <Separator />
          <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
            <div className="col-span-1  grid items-start gap-6 lg:col-span-1">
              <RunPageContainer>
                <Card>
                  <CardHeader>
                    <CardTitle>simulation.log</CardTitle>
                  </CardHeader>
                  <CardContent className="grid min-h-[300px]">
                    <Textarea
                      id="input"
                      placeholder={`------------------------------------------------------
[[44163,1],0]: A high-performance Open MPI point-to-point messaging module
was unable to find any relevant network interfaces:

Module: OpenFabrics (openib)
  Host: 606c5ea6fe1b

Another transport will be used instead, although this may result in
lower performance.

NOTE: You can disable this warning by setting the MCA parameter
btl_base_warn_component_unused to 0.
------------------------------------------------------`}
                      className="min-h-[300px] flex-1"
                    />
                  </CardContent>
                </Card>
              </RunPageContainer>
            </div>
            <div className="col-span-1  grid items-start gap-6 lg:col-span-1">
              <RunPageContainer>
                <Card>
                  <CardHeader>
                    <CardTitle>bands.out</CardTitle>
                  </CardHeader>
                  <CardContent className="grid min-h-[300px]">
                    <Image
                      src="/examples/bandgap.png"
                      width={377}
                      height={504}
                      alt="Dashboard"
                      className="block "
                    />
                  </CardContent>
                </Card>
              </RunPageContainer>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
