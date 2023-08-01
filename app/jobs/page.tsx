import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { jobSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Jobs",
  description: "시뮬레이션 작업 수행 이력 조회",
}

// Simulate a database read for tasks.
async function getJobs() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/jobs/data/jobs.json")
  )

  const jobs = JSON.parse(data.toString())

  return z.array(jobSchema).parse(jobs)
}

export default async function TaskPage() {
  // const tasks = await getTasks()

  const jobs = await getJobs()
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
          <DataTable data={jobs} columns={columns} />
        </CardContent>
      </Card>
    </section>
  )
}
