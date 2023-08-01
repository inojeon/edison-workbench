import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
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
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Jobs",
  description: "시뮬레이션 작업 수행 이력 조회",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/jobs/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

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
          <DataTable data={tasks} columns={columns} />
        </CardContent>
      </Card>
    </section>
  )
}
