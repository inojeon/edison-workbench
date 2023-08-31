"use client"

import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import JobsTable from "./components/jobs-table"

export default async function JobsPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Quantum Espresso Jobs</CardTitle>
          <CardDescription>
            작업 실행 이력을 조회 할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobsTable />
        </CardContent>
      </Card>
    </section>
  )
}
