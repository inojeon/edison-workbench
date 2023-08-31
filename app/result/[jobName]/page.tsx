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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// import { Sidebar } from "../../components/sidebar"
import { SciApp } from "../../run/data/sciApps"
import { Sidebar } from "../components/sidebar"

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
              <RunPageContainer></RunPageContainer>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
