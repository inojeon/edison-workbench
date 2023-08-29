"use client"

import { useState } from "react"

import { Card } from "@/components/ui/card"

import CreateNewJob from "./components/create-new-job"
import { Sidebar } from "./components/sidebar"

export default function IndexPage() {
  return (
    <section className="container mt-4">
      <Card className=" flex  h-[calc(100vh-96px)]">
        <div className=" w-60 border-r pt-2">
          <Sidebar />
        </div>
        <div className="w-full  overflow-auto">
          <CreateNewJob />
        </div>
      </Card>
    </section>
  )
}
